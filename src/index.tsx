import React from "react";
import ReactDOM from "react-dom";
import { connect, keyStores, WalletConnection, Contract } from "near-api-js";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

import "./index.css";

import App from "./App";

const NETWORK = process.env.REACT_APP_OCT_NETWORK || "testnet";
const REGISTRY =
  process.env.REACT_APP_OCT_REGISTRY_CONTRACT_NAME ||
  "registry.test_oct.testnet";

const nearConfig = {
  networkId: NETWORK,
  nodeUrl: `https://rpc.${NETWORK}.near.org`,
  contractName: REGISTRY,
  walletUrl: `https://wallet.${NETWORK}.near.org`,
  helperUrl: `https://helper.${NETWORK}.near.org`,
  explorerUrl: `https://explorer.${NETWORK}.near.org`,
  tokenDecimal: 18,
};

const initNear = async () => {
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig
    )
  );

  window.walletConnection = new WalletConnection(near, "octopus_bridge");

  window.registry = await new Contract(
    window.walletConnection.account(),
    REGISTRY,
    {
      viewMethods: ["get_appchain_status_of"],
      changeMethods: [],
    }
  );

  window.getAppchainInfo = async (appchain_id) => {
    console.log("appchain_id", appchain_id);
    const appchainStatus = await window.registry.get_appchain_status_of({
      appchain_id,
    });
    const appchainAnchor = appchainStatus.appchain_anchor;
    window.anchor = await new Contract(
      window.walletConnection.account(),
      appchainAnchor,
      {
        viewMethods: ["get_appchain_settings"],
        changeMethods: [],
      }
    );
    const appchainInfo = await window.anchor.get_appchain_settings({});
    console.log("appchainInfo", appchainInfo);
    return appchainInfo;
  };
};

initNear().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
