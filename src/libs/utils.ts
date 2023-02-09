const BigNumber = require('bignumber.js')

export function amountToHuman(
  origin: string | undefined,
  decimals: number,
  fixed: number = 2
) {
  if (!origin) {
    return ''
  }
  let originNumber = origin
  if (typeof originNumber === 'string') {
    originNumber = originNumber.replaceAll(',', '')
  }

  return new BigNumber(originNumber)
    .div(new BigNumber(10 ** decimals))
    .toNumber()
    .toFixed(fixed)
}

export function percentage(quantity: string, total: string) {
  return new BigNumber(quantity)
    .div(new BigNumber(total))
    .times(100)
    .toNumber()
    .toFixed(2)
}

export function amountFromHuman(origin, decimals: number) {
  return new BigNumber(origin)
    .times(new BigNumber(10 ** decimals))
    .toNumber()
    .toFixed(2)
}

export function briefHex(address: string, length: number) {
  const before = Math.ceil(length / 2)
  const after = length - before
  return address.length > 2 + length
    ? address.slice(0, 2 + before) + '...' + address.slice(-after)
    : address
}
