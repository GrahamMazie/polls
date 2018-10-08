import { createStore } from "redux";
import { connectRouter } from "connected-react-router";
import rootReducer from "./reducers/rootReducer";
import polls from "./data/polls";
import createHistory from "history/createBrowserHistory";

const defaultState = {
  polls
};

export const history = createHistory();

const store = createStore(
  connectRouter(history)(rootReducer),
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//export const history = syncHistoryWithStore(createBrowserHistory(), store);
//export const history = syncHistoryWithStore(browserHistory, store);

// WEBPACK HOT RELOADING
// if (module.hot) {
//   module.hot.accept("./reducers/", () => {
//     const nextRootReducer = require("./reducers/rootReducer").default;
//     store.replaceReducer(nextRootReducer);
//   });
// }

export default store;
