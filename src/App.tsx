import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { ChakraProvider, Center, Spinner, extendTheme } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { initPolkaApi } from './libs/polkadotApi'

import Root from 'views/Root'
import Home from 'views/Home'
import Blocks from 'views/Blocks'
import BlockDetail from 'views/Blocks/BlockDetail'
import Accounts from 'views/Accounts'
import AccountDetail from 'views/Accounts/AccountDetail'
import Transfers from 'views/Transfers'
import TransferDetail from 'views/Transfers/TransferDetail'
import ExtrinsicDetail from 'views/Extrinsics/ExtrinsicDetail'
import Extrinsics from 'views/Extrinsics'
import { useEffect } from 'react'
import { getAppchainTheme } from './libs/appchainThemes'

function App() {
  const [appchainInfo, setAppchainInfo] = useState<any>()
  const [appchains, setAppchains] = useState<any[]>()
  const [client, setClient] = useState<any>()

  const appchain = window.location.pathname.split('/')[1]

  const appchainTheme = getAppchainTheme(appchain)
  const theme = extendTheme(appchainTheme)

  useEffect(() => {
    const init = async () => {
      const appchains = await window.getAppchains()
      setAppchains(appchains)

      try {
        console.log('appchain', appchain)

        if (!appchain) {
          const defaultAppchain = appchains[appchains.length - 1]
          // window.location.replace(`/${defaultAppchain.appchain_id}`)
        }
        const info = await window.getAppchainInfo(appchain)
        await initPolkaApi(info)
        setAppchainInfo(info)
      } catch (err) {
        console.log(err)
        setAppchainInfo(null)
      }
    }
    init()
  }, [appchain])

  useEffect(() => {
    if (!appchainInfo) {
      return
    }
    setClient(
      new ApolloClient({
        uri: appchainInfo.subql_endpoint,
        cache: new InMemoryCache(),
      })
    )
  }, [appchainInfo])

  return (
    <ChakraProvider theme={theme}>
      {client ? (
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Root appchains={appchains} appchainInfo={appchainInfo} />
                }
              >
                <Route path="/:appchain" element={<Home />} />
                <Route path="/:appchain/blocks" element={<Blocks />} />
                <Route path="/:appchain/blocks/:id" element={<BlockDetail />} />
                <Route path="/:appchain/accounts" element={<Accounts />} />
                <Route
                  path="/:appchain/accounts/:id"
                  element={<AccountDetail />}
                />
                <Route path="/:appchain/transfers" element={<Transfers />} />
                <Route
                  path="/:appchain/transfers/:id"
                  element={<TransferDetail />}
                />
                <Route path="/:appchain/extrinsics" element={<Extrinsics />} />
                <Route
                  path="/:appchain/extrinsics/:id"
                  element={<ExtrinsicDetail />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      ) : (
        <Center h="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="gray.500"
            size="lg"
          />
        </Center>
      )}
    </ChakraProvider>
  )
}

export default App
