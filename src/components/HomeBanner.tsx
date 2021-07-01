import { Box, Flex, Input, IconButton, Button, Center, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import headerBg from 'assets/background.svg';
import { SearchIcon } from '@chakra-ui/icons';
import { Container } from 'react-dom';
import { gql, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

async function fetchBlockByHash(blockHash, client) {
  const rt = await client.query({
    query: gql`
      query blockdetail($id: String!) {
        block(
          id: $id
        ){
          id
        }
      }
    `,
    variables: { id: blockHash }
  });

  if (rt.data.block) {
      return rt.data.block.id;
  }

  return rt.data.block;
}

async function fetchBlockByNum(blockNumber, client) {
  const rt = await client.query({
    query: gql`
      query blockdetail($number: BigFloat!) {
        blocks(filter: {number: {equalTo: $number}}) {
          nodes {
            id
          }
        }
      }
    `,
    variables: { number: blockNumber }
  });

  if (rt.data.blocks.nodes[0]) {
    return rt.data.blocks.nodes[0].id;
  }
  return rt.data.blocks.nodes[0];
}

async function fetchTxByHash(hash, client) {
  const rt = await client.query({
    query: gql`
      query txdetail($id: String!) {
        extrinsic(
          id: $id
        ) {
          id
        }
    
      }
    `,
    variables: { id: hash }
  });

  if (rt.data.extrinsic) {
    return rt.data.extrinsic.id;
  }
  return rt.data.extrinsic;
}



async function checkKeywordType(keyword, appoloClient) {
  if (/^[0-9]+$/.test(keyword)) {
    const blockResult = await fetchBlockByNum(keyword, appoloClient);
    if (blockResult) {
      return 'blockNumber';
    }
  }
  if (/^0x[0-9a-f]+$/.test(keyword)) {
    const tranResult = await fetchTxByHash(keyword, appoloClient);
    if (tranResult) {
      return 'transaction';
    }
    const blockResult = await fetchBlockByHash(keyword, appoloClient);
    if (blockResult) {
      return 'blockHash';
    }
  }
  return '';
}

const HomeBanner = () => {

  const navigate = useNavigate();
  const appoloClient = useApolloClient();
  const inputRef = useRef<any>();
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const onInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.style.maxWidth = '480px';
    }
  }

  const onInputBlur = () => {
    if (inputRef.current) {
      inputRef.current.style.maxWidth = '420px';
    }
  }

  const onSearch = async () => {
    setIsSearching(true);
    const type = await checkKeywordType(keyword, appoloClient);
    let link = '';
    if (type == 'blockNumber' || type == 'blockHash') {
      link = `/blocks/${keyword}`;
    } else if (type == 'transaction') {
      link = `/extrinsics/${keyword}`;
    }
    await new Promise((resolve) => setTimeout(() => resolve(0), 500));
    navigate(link);
    setIsSearching(false);
  }

  return (
    <div style={{ 
      background: `#26262f url(${headerBg})`, backgroundSize: '1600px auto', 
      backgroundPosition: 'center -110px', backgroundRepeat: 'no-repeat' 
    }}>
      <Center h="120px" pt="20px">
        <Text color="white" fontSize="5xl">Where Web3.0 Happens</Text>
      </Center>
      <Center h="180px" pb="100px">
        <Flex w="100%" maxW="420px" ref={inputRef} transition="max-width .3s ease">
          <Input color="grey" background="white" onFocus={onInputFocus} onBlur={onInputBlur} 
            onChange={e => setKeyword(e.target.value)} size="lg" flex="1" 
            placeholder="Search by block, transaction id" borderRightRadius="0" />
          <Button colorScheme="teal" size="lg" borderLeftRadius="0" onClick={onSearch} 
            isLoading={isSearching} disabled={isSearching}>
            Search
          </Button>
        </Flex>
      </Center>
    </div>
  );
}

export default HomeBanner;