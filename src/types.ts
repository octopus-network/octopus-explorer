export interface Account {
  createdAt: string
  creator: { id: string; isContract: boolean }
  erc20TokenContract: {
    id: string
    name: string
    symbol: string
    decimals: number
    totalSupply: string
    erc20Transfers: {
      totalCount: number
    }
  }
  erc721TokenContract: any
  erc1155TokenContract: any
  feeFrozenBalance: string
  freeBalance: string
  id: string
  isContract: boolean
  miscFrozenBalance: string
  nonce: number
  reservedBalance: string
  transactionIn: { nodes: any[] }
}
