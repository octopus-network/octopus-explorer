import React from "react";
import ReactDOM from "react-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

import "./index.css";

import App from "./App";
import {initNear} from "./libs/nearApi";


initNear().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
