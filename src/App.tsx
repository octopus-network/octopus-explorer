import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { ChakraProvider, Center, Spinner, extendTheme } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { initPolkaApi, getBalanceOf } from "./libs/polkadotApi";

import Root from "views/Root";
import Home from "views/Home";
import Blocks from "views/Blocks";
import BlockDetail from "views/Blocks/BlockDetail";
import Accounts from "views/Accounts";
import AccountDetail from "views/Accounts/AccountDetail";
import Transfers from "views/Transfers";
import TransferDetail from "views/Transfers/TransferDetail";
import ExtrinsicDetail from "views/Extrinsics/ExtrinsicDetail";
import Extrinsics from "views/Extrinsics";
import { useEffect } from "react";
import { getAppchainTheme } from "./libs/appchainThemes";

function App() {
  const [appchainInfo, setAppchainInfo] = useState<any>();
  const [appchains, setAppchains] = useState<any[]>();
  const [client, setClient] = useState<any>();

  const urlParams = new URLSearchParams(window.location.search);
  const appchain = urlParams.get("appchain");
  const appchainTheme = getAppchainTheme(appchain);
  const theme = extendTheme(appchainTheme);

  useEffect(() => {
    (async () => {
      try {
        if (!appchain) {
          setAppchainInfo(null);
          return;
        }
        const info = await window.getAppchainInfo(appchain);
        await initPolkaApi(info);
        setAppchainInfo(info);

        const appchains = await window.getAppchains();
        setAppchains(appchains);
      } catch (err) {
        console.log(err);
        setAppchainInfo(null);
      }
    })();
  }, [appchain]);

  useEffect(() => {
    if (!appchainInfo) {
      return;
    }
    setClient(
      new ApolloClient({
        uri: appchainInfo.subql_endpoint,
        cache: new InMemoryCache(),
      })
    );
  }, [appchainInfo]);

  return (
    <ChakraProvider theme={theme}>
      {client ? (
        <ApolloProvider client={client}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Root appchains={appchains} appchainInfo={appchainInfo} />
                }
              >
                <Route path="" element={<Navigate to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="blocks" element={<Blocks />} />
                <Route path="blocks/:id" element={<BlockDetail />} />
                <Route path="accounts" element={<Accounts />} />
                <Route path="accounts/:id" element={<AccountDetail />} />
                <Route path="transfers" element={<Transfers />} />
                <Route path="transfers/:id" element={<TransferDetail />} />
                <Route path="extrinsics" element={<Extrinsics />} />
                <Route path="extrinsics/:id" element={<ExtrinsicDetail />} />
              </Route>
            </Routes>
          </Router>
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
  );
}

export default App;
