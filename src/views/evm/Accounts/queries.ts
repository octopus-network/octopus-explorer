import { useQuery, gql } from "@apollo/client";

export const ACCOUNT_QUERY = gql`
  query Accounts($id: String!) {
    account(id: $id) {
      id
      nonce
      freeBalance
      reservedBalance
      miscFrozenBalance
      feeFrozenBalance
      isContract
      createdAt
      erc20TokenContract {
        id
        name
        symbol
        decimals
        totalSupply
        erc20Transfers {
          totalCount
        }
      }
      erc721TokenContract {
        id
        name
        symbol
        tokens {
          totalCount
        }
        erc721Transfers {
          totalCount
        }
      }
      erc1155TokenContract {
        id
        tokens {
          totalCount
        }
        erc1155Transfers {
          totalCount
        }
      }
      creator {
        id
        isContract
      }
      transactionIn(first:1, orderBy: TIMESTAMP_ASC) {
        nodes {
          id
        }
      }
    }
  }
`;

export const EVM_TRANSACTIONS_QUERY = gql`
  query AccountTransactions($id: String!, $offset: Int!, $pageSize: Int!) {
    transactions(
      filter: {
        or: [
          {fromId: { equalTo: $id}}
          {toId: { equalTo: $id}}
        ]
      },
      offset: $offset,
      first: $pageSize,
      orderBy: TIMESTAMP_DESC
    ) {
      nodes {
        id
        from {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        to {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        value
        isSuccess
        timestamp
      }
      totalCount
    }
  }
`;

export const EVM_ERC20_TRANSACTIONS_QUERY = gql`
  query AccountTransactions($id: String!, $offset: Int!, $pageSize: Int!) {
    erc20Transfers(
      filter: {
        or: [
          {fromId: { equalTo: $id}}
          {toId: { equalTo: $id}}
        ]
      },
      offset: $offset,
      first: $pageSize,
      orderBy: TIMESTAMP_DESC
    ) {
      nodes {
        id
        transactionId
        from {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        to {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        tokenContract {
          id
          symbol
        }
        value
        timestamp
      }
      totalCount
    }
  }
`;

export const EVM_ERC721_TRANSACTIONS_QUERY = gql`
  query AccountTransactions($id: String!, $offset: Int!, $pageSize: Int!) {
    erc721Transfers(
      filter: {
        or: [
          {fromId: { equalTo: $id}}
          {toId: { equalTo: $id}}
        ]
      },
      offset: $offset,
      first: $pageSize,
      orderBy: TIMESTAMP_DESC
    ) {
      nodes {
        id
        transactionId
        from {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        to {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        tokenContract {
          id
          symbol
        }
        tokenId
        timestamp
      }
      totalCount
    }
  }
`;


export const EVM_ERC1155_TRANSACTIONS_QUERY = gql`
  query AccountTransactions($id: String!, $offset: Int!, $pageSize: Int!) {
    erc1155Transfers(
      filter: {
        or: [
          {fromId: { equalTo: $id}}
          {toId: { equalTo: $id}}
        ]
      },
      offset: $offset,
      first: $pageSize,
      orderBy: TIMESTAMP_DESC
    ) {
      nodes {
        id
        transactionId
        from {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        to {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        value
        tokenId
        timestamp
      }
      totalCount
    }
  }
`;


export const CALLS_QUERY = gql`
  query AccountCalls($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      calls(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
        nodes {
          id
          section
          method
          args
          timestamp
          isSuccess
          signerId
          extrinsicId
          parentCallId
        }
        totalCount
      }
    }
  }
`;

export const TRANSFERS_OUT_QUERY = gql`
  query AccountTransfersOut($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      transferOut(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
        nodes {
          id
          fromId
          toId
          amount
          extrinsicId
          timestamp
        }
        totalCount
      }
    }
  }
`;

export const TRANSFERS_IN_QUERY = gql`
  query AccountTransfersIn($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      transferIn(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
        nodes {
          id
          fromId
          toId
          amount
          extrinsicId
          timestamp
        }
        totalCount
      }
    }
  }
`;

export const EVM_LOGS_QUERY = gql`
  query evmLogs($contractId: String!, $offset: Int!, $pageSize: Int!) {
    evmLogs(filter:{contractId: {equalTo: $contractId}}, offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
      nodes {
        id
        logIndex
        transactionId
        data
        topics
      }
      totalCount
    }
  }
`;

export const CONTRACT_ERC20_TRANSACTIONS_QUERY = gql`
  query erc20Transfers($contractId: String!, $offset: Int!, $pageSize: Int!) {
    erc20Transfers(filter:{tokenContractId: {equalTo: $contractId}}, offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
      nodes {
        id
        transactionId
        from {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        to {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        tokenContract {
          id
          symbol
        }
        value
        timestamp
      }
      totalCount
    }
  }
`;

export const CONTRACT_ERC721_TRANSACTIONS_QUERY = gql`
  query erc721Transfers($contractId: String!, $offset: Int!, $pageSize: Int!) {
    erc721Transfers(filter:{tokenContractId: {equalTo: $contractId}}, offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
      nodes {
        id
        transactionId
        from {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        to {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        tokenContract {
          id
          symbol
        }
        token {
          id
          idInContract
        }
        timestamp
      }
      totalCount
    }
  }
`;

export const CONTRACT_ERC1155_TRANSACTIONS_QUERY = gql`
  query erc1155Transfers($contractId: String!, $offset: Int!, $pageSize: Int!) {
    erc1155Transfers(filter:{tokenContractId: {equalTo: $contractId}}, offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
      nodes {
        id
        transactionId
        from {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        to {
          id
          isContract
          erc20TokenContractId
          erc721TokenContractId
          erc1155TokenContractId
        }
        tokenContractId
        value
        token {
          id
          idInContract
        }
        timestamp
      }
      totalCount
    }
  }
`;


export const CONTRACT_ERC721_TOKENS_QUERY = gql`
  query erc721Tokens($contractId: String!, $offset: Int!, $pageSize: Int!) {
    erc721Tokens(filter:{tokenContractId: {equalTo: $contractId}}, offset: $offset, first: $pageSize) {
      nodes {
        id
        tokenContractId
        idInContract
        tokenURI
        balances {
          totalCount
        }
        erc721Transfers {
          totalCount
        }
      }
      totalCount
    }
  }
`;

export const CONTRACT_ERC1155_TOKENS_QUERY = gql`
  query erc1155Tokens($contractId: String!, $offset: Int!, $pageSize: Int!) {
    erc1155Tokens(filter:{tokenContractId: {equalTo: $contractId}}, offset: $offset, first: $pageSize) {
      nodes {
        id
        tokenContractId
        idInContract
        uri
        totalSupply
        balances {
          totalCount
        }
        erc1155Transfers {
          totalCount
        }
      }
      totalCount
    }
  }
`;

export const PAGE_SIZE = 20;