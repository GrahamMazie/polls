import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/App";
import "./styles/css/index.css";

const router = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(router, document.getElementById("root"));
