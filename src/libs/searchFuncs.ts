import { gql } from '@apollo/client'
import { decodeAddress, encodeAddress } from '@polkadot/keyring'
import { hexToU8a, isHex } from '@polkadot/util'

async function fetchBlockByHash(blockHash, client) {
  const rt = await client.query({
    query: gql`
      query blockdetail($id: String!) {
        block(id: $id) {
          id
        }
      }
    `,
    variables: { id: blockHash },
  })

  if (rt.data.block) {
    return rt.data.block.id
  }

  return rt.data.block
}

async function fetchBlockByNum(blockNumber, client) {
  const rt = await client.query({
    query: gql`
      query blockdetail($number: BigFloat!) {
        blocks(filter: { number: { equalTo: $number } }) {
          nodes {
            id
          }
        }
      }
    `,
    variables: { number: blockNumber },
  })

  if (rt.data.blocks.nodes[0]) {
    return rt.data.blocks.nodes[0].id
  }
  return rt.data.blocks.nodes[0]
}

async function fetchTxById(id, client) {
  const rt = await client.query({
    query: gql`
      query txdetail($id: String!) {
        extrinsic(id: $id) {
          id
        }
      }
    `,
    variables: { id },
  })

  if (rt.data.extrinsic) {
    return rt.data.extrinsic.id
  }
  return rt.data.extrinsic
}

async function fetchTransactionByHash(hash, client) {
  if (window.isEvm) {
    const rt = await client.query({
      query: gql`
        query transaction($id: String!) {
          transaction(id: $id) {
            id
          }
        }
      `,
      variables: { id: hash },
    })

    if (rt.data.transaction) {
      return rt.data.transaction.id
    }
  }
  return false
}

async function fetchAccountByHash(hash, client) {
  const rt = await client.query({
    query: gql`
      query account($id: String!) {
        account(id: $id) {
          id
        }
      }
    `,
    variables: { id: window.isEvm ? hash.toLowerCase() : hash },
  })

  if (rt && rt.data.account) {
    console.log("rt.data.account", rt.data.account)

    return rt.data.account.id
  }
  return rt.data.account
}

function isValidAddress(address) {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address))
    return true
  } catch (error) {
    return false
  }
}

async function checkKeywordType(keyword, appoloClient) {
  if (/^[0-9]+$/.test(keyword)) {
    const blockResult = await fetchBlockByNum(keyword, appoloClient)
    if (blockResult) {
      return 'blockNumber'
    }
  } else if (/^[0-9]+(\-)[0-9]+$/.test(keyword)) {
    const blockResult = await fetchTxById(keyword, appoloClient)
    if (blockResult) {
      return 'transaction'
    }
  } else {
    const [transactionResult, accountResult, blockResult] = await Promise.all([
      await fetchTransactionByHash(keyword, appoloClient),
      await fetchAccountByHash(keyword, appoloClient),
      await fetchBlockByHash(keyword, appoloClient),
    ])
    if (transactionResult) {
      return 'transactionId'
    }
    if (accountResult) {
      return 'accountId'
    }
    if (blockResult) {
      return 'blockHash'
    }
  }
  return ''
}

export async function getLinkFromSearch(keyword, appoloClient) {
  const type = await checkKeywordType(keyword, appoloClient)

  let link = ''
  if (type == 'blockNumber' || type == 'blockHash') {
    link = `/blocks/${keyword}`
  } else if (type == 'transaction') {
    link = `/extrinsics/${keyword}`
  } else if (type == 'accountId') {
    link = `/accounts/${keyword}`
  } else if (type == 'transactionId') {
    link = `/transactions/${keyword}`
  }
  console.log('link', link)
  return link
}
