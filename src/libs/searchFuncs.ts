import { gql } from "@apollo/client";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
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
        blocks(filter: { number: { equalTo: $number } }) {
          nodes {
            id
          }
        }
      }
    `,
    variables: { number: blockNumber },
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
        extrinsic(id: $id) {
          id
        }
      }
    `,
    variables: { id: hash },
  });

  if (rt.data.extrinsic) {
    return rt.data.extrinsic.id;
  }
  return rt.data.extrinsic;
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
    variables: { id: hash },
  });

  if (rt.data.account) {
    return rt.data.account.id;
  }
  return rt.data.account;
}

function isValidAddress(address) {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
    return true;
  } catch (error) {
    return false;
  }
}

async function checkKeywordType(keyword, appoloClient) {
  if (/^[0-9]+$/.test(keyword)) {
    const blockResult = await fetchBlockByNum(keyword, appoloClient);
    if (blockResult) {
      return "blockNumber";
    }
  } else if (isValidAddress(keyword)) {
    console.log("here");
    const accountResult = await fetchAccountByHash(keyword, appoloClient);
    if (accountResult) {
      console.log("accountResult", accountResult);
      return "accountId";
    }
  } else if (/^0x[0-9a-f]+$/.test(keyword)) {
    const tranResult = await fetchTxByHash(keyword, appoloClient);
    if (tranResult) {
      return "transaction";
    }
    const blockResult = await fetchBlockByHash(keyword, appoloClient);
    if (blockResult) {
      return "blockHash";
    }
  }
  return "";
}

export async function getLinkFromSearch(keyword, appoloClient) {
  const type = await checkKeywordType(keyword, appoloClient);
  let link = "";
  if (type == "blockNumber" || type == "blockHash") {
    link = `/blocks/${keyword}`;
  } else if (type == "transaction") {
    link = `/extrinsics/${keyword}`;
  } else if (type == "accountId") {
    link = `/accounts/${keyword}`;
  }
  console.log("link", link);
  return link;
}
