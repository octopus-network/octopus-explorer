import { ApiPromise, WsProvider } from "@polkadot/api";
import { amountToHuman } from "./utils";

let appchainApi;
let appchainInfo;
export async function initPolkaApi(info: any) {
  appchainInfo = info;
  const wsProvider = new WsProvider(info.rpc_endpoint);
  appchainApi = await ApiPromise.create({
    provider: wsProvider,
  });
}

export function getAmountHuman(origin) {
  const {
    appchain_metadata: {
      fungible_token_metadata: { decimals },
    },
  } = appchainInfo;
  return amountToHuman(origin, decimals);
}

export async function getBalanceOf(accountId: string) {
  if (appchainApi) {
    const {
      appchain_metadata: {
        fungible_token_metadata: { decimals },
      },
    } = appchainInfo;
    const account = await appchainApi.query.system.account(accountId);
    return amountToHuman(account.data.free.toString(), decimals);
  }
}

export async function getBlock(blockhash: string) {
  if (appchainApi) {
    return await appchainApi.rpc.chain.getBlock(blockhash);
  }
}

export async function getEvents(blockhash: string) {
  if (appchainApi) {
    return await appchainApi.query.system.events.at(blockhash);
  }
}

export async function getNextNotificationId() {
  if (appchainApi) {
    const nextNotificationIndex = (await appchainApi.query.octopusAppchain.nextNotificationId()).toJSON();
    return nextNotificationIndex;
  }
}

