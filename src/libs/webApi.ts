import Web3 from "web3";
const Web3HttpProvider = require('web3-providers-http');
import { erc20Abi } from "./abi/erc20Abi";
import { erc721Abi } from "./abi/erc721Abi";
import { erc1155Abi } from "./abi/erc1155Abi";
import { appchainConfigs } from "./appchainConfigs";

let web3;
export function initWeb3(appchainId) {
  if (!web3) {
    var provider = new Web3HttpProvider(appchainConfigs[appchainId].evmRpc, {

      headers: [{
        name: 'Access-Control-Allow-Origin',
        value: appchainConfigs[appchainId].evmRpc
      }]

    });
    web3 = new Web3(provider);
    console.log("web3", appchainConfigs[appchainId].evmRpc)
  }
}

export function erc20Contract(appchainId: string, contractId: string) {
  initWeb3(appchainId)
  return new web3.eth.Contract(erc20Abi, contractId);
}
export function erc721Contract(appchainId: string, contractId: string) {
  initWeb3(appchainId)
  return new web3.eth.Contract(erc721Abi, contractId);
}
export function erc1155Contract(appchainId: string, contractId: string) {
  initWeb3(appchainId)
  return new web3.eth.Contract(erc1155Abi, contractId);
}