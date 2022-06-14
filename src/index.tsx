import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { createRoot } from "react-dom/client"

dayjs.extend(relativeTime);

import "./index.css";

import App from "./App";
import {initNear} from "./libs/nearApi";


const root = createRoot(document.getElementById("root"));

initNear().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
