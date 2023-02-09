import { amountToHuman } from "./utils";

let appchainInfo;
export async function initAppchainUtils(info: any) {
  appchainInfo = info;
}

export function getNativeAmountHuman(origin, fixed: number = 2) {
  const {
    appchain_metadata: {
      fungible_token_metadata: { decimals },
    },
  } = appchainInfo;
  return amountToHuman(origin, decimals, fixed);
}

