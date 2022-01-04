const BigNumber = require("bignumber.js");
export function amountToHuman(origin: string, decimals: number) {
  return new BigNumber(origin)
    .div(new BigNumber(10 ** decimals))
    .toNumber()
    .toFixed(2);
}

export function amountFromHuman(origin, decimals: number) {
  return new BigNumber(origin)
    .times(new BigNumber(10 ** decimals))
    .toNumber()
    .toFixed(2);
}
