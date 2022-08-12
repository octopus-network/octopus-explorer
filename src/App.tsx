import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import { ChakraProvider, Center, Spinner, extendTheme } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { initPolkaApi } from "./libs/polkadotApi";

import Root from "views/Root";
import Home from "views/Home";
import Blocks from "views/default/Blocks";
import BlockDetail from "views/default/Blocks/BlockDetail";
import Transfers from "views/default/Transfers";
import TransferDetail from "views/default/Transfers/TransferDetail";
import ExtrinsicDetail from "views/default/Extrinsics/ExtrinsicDetail";
import Extrinsics from "views/default/Extrinsics";
import { useEffect } from "react";
import { getAppchainTheme } from "./libs/appchainThemes";

import DefaultAccounts from "views/default/Accounts";
import DefaultAccountDetail from "views/default/Accounts/AccountDetail";

import EvmAccounts from "views/evm/Accounts";
import EvmAccountDetail from "views/evm/Accounts/AccountDetail";
import Transactions from "views/evm/Transactions";
import TransactionDetail from "views/evm/Transactions/TransactionDetail";

const TxRedirect = () => {
  const { appchain, id } = useParams();
  return <Navigate to={`/${appchain}/transactions/${id}`} replace />;
};

function App() {
  const [appchainInfo, setAppchainInfo] = useState<any>();
  const [appchains, setAppchains] = useState<any[]>();
  const [client, setClient] = useState<any>();

  const appchain = window.location.pathname.split("/")[1];

  const appchainTheme = getAppchainTheme(appchain);
  const theme = extendTheme(appchainTheme);

  useEffect(() => {
    const init = async () => {
      const appchains = await window.getAppchains();
      setAppchains(appchains);

      try {
        console.log("appchain", appchain);

        if (!appchain) {
          const defaultAppchain = appchains[appchains.length - 1];
          window.location.replace(`/${defaultAppchain.appchain_id}`);
        }
        const info = await window.getAppchainInfo(appchain);
        await initPolkaApi(info);
        setAppchainInfo(info);
      } catch (err) {
        console.log(err);
        setAppchainInfo(null);
      }
    };
    init();
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

  if (!appchainInfo) {
    return;
  }
  const Accounts = window.isEvm ? EvmAccounts : DefaultAccounts;
  const AccountDetail = window.isEvm ? EvmAccountDetail : DefaultAccountDetail;
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
                <Route
                  path="/:appchain/transactions"
                  element={<Transactions />}
                />
                <Route
                  path="/:appchain/transactions/:id"
                  element={<TransactionDetail />}
                />
                <Route path="/:appchain/tx/:id" element={<TxRedirect />} />
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
  );
}

export default App;
