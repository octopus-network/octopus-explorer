const BigNumber = require('bignumber.js')

export function amountToHuman(origin: string, decimals: number, fixed: number = 2) {
  let originNumber = origin
  if (typeof originNumber === 'string') {
    originNumber = originNumber.replaceAll(',', '')
  }

  return new BigNumber(originNumber)
    .div(new BigNumber(10 ** decimals))
    .toNumber()
    .toFixed(fixed)
}

export function amountFromHuman(origin, decimals: number) {
  return new BigNumber(origin)
    .times(new BigNumber(10 ** decimals))
    .toNumber()
    .toFixed(2)
}

export function briefHex(address: string, length: number) {
  const before = Math.ceil(length / 2);
  const after = length - before
  return address.length > 2 + length ? address.slice(0, 2 + before) + "..." + address.slice(-after) : address;
}