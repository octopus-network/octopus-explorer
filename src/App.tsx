import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Root from 'views/Root';
import Home from 'views/Home';
import Blocks from 'views/Blocks';
import BlockDetail from 'views/Blocks/BockDetail';
import ExtrinsicDetail from 'views/Extrinsics/ExtrinsicDetail';
import Extrinsics from 'views/Extrinsics';
import { useEffect } from 'react';

function App() {
  const [appchainInfo, setAppchainInfo] = useState<any>();
  const [client, setClient] = useState<any>();

  const urlParams = new URLSearchParams(window.location.search);
  const appchain = urlParams.get('appchain');
  
  useEffect(() => {
    if (!appchain) {
      setAppchainInfo(null);
      return;
    }
    window.contract.get_appchain({
      appchain_id: appchain
    }).then(info => {
      console.log(info);
      setAppchainInfo(info);
    }).catch(err => {
      setAppchainInfo(null);
    });
  }, [appchain]);

  useEffect(() => {
    if (!appchainInfo) {
      return;
    }

    setClient(
      new ApolloClient({
        uri: appchainInfo.subql_url,
        cache: new InMemoryCache()
      })
    );

  }, [appchainInfo]);

  return (
    client ? 
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Root />}>
              <Route path='' element={<Navigate to='home' />} />
              <Route path='home' element={<Home />} />
              <Route path='blocks' element={<Blocks />} />
              <Route path='blocks/:id' element={<BlockDetail />} />
              <Route path='extrinsics' element={<Extrinsics />} />
              <Route path='extrinsics/:id' element={<ExtrinsicDetail />} />
            </Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </ApolloProvider> :
    <div>Loading...</div>
  );
}

export default App;