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
      creator {
        id
        isContract
      }
      transactionIn(first:1, orderBy: TIMESTAMP_ASC) {
        nodes {
          id
        }
      }
      createdAt
    }
  }
`;

export const TRANSACTIONS_OUT_QUERY = gql`
  query AccountTransactionsOut($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      transactionOut(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
        nodes {
          id
          fromId
          to {
            id
            isContract
          }
          isSuccess
          value
          timestamp
        }
        totalCount
      }
    }
  }
`;

export const TRANSACTIONS_IN_QUERY = gql`
  query AccountTransactionsIn($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      transactionIn(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
        nodes {
          id
          fromId
          to {
            id
            isContract
          }
          isSuccess
          value
          timestamp
        }
        totalCount
      }
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
  query evmLogs($address: String!, $offset: Int!, $pageSize: Int!) {
    evmLogs(filter:{address: {equalTo: $address}}, offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
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


export const PAGE_SIZE = 20;