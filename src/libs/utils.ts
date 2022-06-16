const BigNumber = require('bignumber.js')

export function amountToHuman(origin: string, decimals: number) {
  let originNumber = origin
  if (typeof originNumber === 'string') {
    originNumber = originNumber.replaceAll(',', '')
  }
  console.log('originNumber', originNumber)
  return new BigNumber(originNumber)
    .div(new BigNumber(10 ** decimals))
    .toNumber()
    .toFixed(2)
}

export function amountFromHuman(origin, decimals: number) {
  return new BigNumber(origin)
    .times(new BigNumber(10 ** decimals))
    .toNumber()
    .toFixed(2)
}
