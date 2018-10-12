import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers/rootReducer";
import { history } from "./store";
import Main from "./components/Main";
import "./styles/css/index.css";

// Create store with reducers and initial state
const store = createStore(
  connectRouter(history)(rootReducer),
  {},
  compose(applyMiddleware(reduxThunk, routerMiddleware(history)))
);

const router = (
  <Provider store={store}>
    <Main />
  </Provider>
);

render(router, document.getElementById("root"));
