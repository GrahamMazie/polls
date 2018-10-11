import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import App from "./components/App";
import "./styles/css/index.css";

// Create store with reducers and initial state
const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));

const router = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(router, document.getElementById("root"));
