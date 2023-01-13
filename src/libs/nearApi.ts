import { connect, keyStores, WalletConnection, Contract } from 'near-api-js'

const NETWORK = process.env.REACT_APP_OCT_NETWORK || 'testnet'
const REGISTRY =
  process.env.REACT_APP_OCT_REGISTRY_CONTRACT_NAME ||
  'registry.test_oct.testnet'

const nearConfig = {
  networkId: NETWORK,
  nodeUrl: `https://rpc.${NETWORK}.near.org`,
  contractName: REGISTRY,
  walletUrl: `https://wallet.${NETWORK}.near.org`,
  helperUrl: `https://helper.${NETWORK}.near.org`,
  explorerUrl: `https://explorer.${NETWORK}.near.org`,
  tokenDecimal: 18,
}

const pageSize = 10

export const initNear = async () => {
  const near = await connect({
    ...nearConfig,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    headers: {},
  })

  window.walletConnection = new WalletConnection(near, 'octopus_bridge')

  window.registry = await new Contract(
    window.walletConnection.account(),
    REGISTRY,
    {
      viewMethods: [
        'get_appchain_status_of',
        'get_appchains_count_of',
        'get_appchains_with_state_of',
      ],
      changeMethods: [],
    }
  )

  async function fetchAppchainInfo(appchain_id: string) {
    const appchainStatus = await window.registry.get_appchain_status_of({
      appchain_id,
    })
    const appchainAnchor = appchainStatus.appchain_anchor
    window.anchor = await new Contract(
      window.walletConnection.account(),
      appchainAnchor,
      {
        viewMethods: ['get_appchain_settings'],
        changeMethods: [],
      }
    )
    let appchainInfo = await window.anchor.get_appchain_settings({})
    appchainInfo = { ...appchainInfo, ...appchainStatus }

    window.isEvm =
      appchainInfo.appchain_metadata.template_type === 'BarnacleEvm'

    localStorage.setItem(appchain_id, JSON.stringify(appchainInfo))
    return appchainInfo
  }

  window.getAppchainInfo = async (appchain_id: string) => {
    const appchainInfo = localStorage.getItem(appchain_id)
    if (appchainInfo) {
      fetchAppchainInfo(appchain_id)
      const info = JSON.parse(appchainInfo)
      window.isEvm = info.appchain_metadata.template_type === 'BarnacleEvm'
      return info
    }
    const info = await fetchAppchainInfo(appchain_id)
    return info
  }

  async function fetchAppchains() {
    const appchainCount = await window.registry.get_appchains_count_of({
      appchain_state: 'Active',
    })
    const promises = new Array(Math.ceil(appchainCount / pageSize))
      .fill('')
      .map(async ($_, index) => {
        const appchains = await window.registry.get_appchains_with_state_of({
          appchain_state: ['Active', 'Closing'],
          page_number: index + 1,
          page_size: pageSize,
          sorting_field: 'RegisteredTime',
          sorting_order: 'Ascending',
        })
        return appchains
      })

    const totalAppchains: any = (await Promise.all(promises)).reduce(
      (total, slice) => [...total, ...slice],
      []
    )
    localStorage.setItem('appchains', JSON.stringify(totalAppchains))
    return totalAppchains
  }
  window.getAppchains = async () => {
    const localAppchains = localStorage.getItem('appchains')
    if (localAppchains) {
      return JSON.parse(localAppchains)
    }
    const appchains = await fetchAppchains()
    return appchains
  }
}
