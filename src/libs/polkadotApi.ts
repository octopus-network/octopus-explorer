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

export function getNativeAmountHuman(origin, fixed: number = 2) {
  const {
    appchain_metadata: {
      fungible_token_metadata: { decimals },
    },
  } = appchainInfo;
  return amountToHuman(origin, decimals, fixed);
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
  } else {
    return null
  }
}

