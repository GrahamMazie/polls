import { createStore } from "redux";
import { syncHistoryWithStore } from "react-router-redux";
import rootReducer from "./reducers/rootReducer";
import polls from "./data/polls";
import { createBrowserHistory } from "history";

const defaultState = {
  polls
};

// REDUX DEVTOOLS
// const enhancers = compose(
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// );

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(createBrowserHistory(), store);
//export const history = syncHistoryWithStore(browserHistory, store);

// WEBPACK HOT RELOADING
// if (module.hot) {
//   module.hot.accept("./reducers/", () => {
//     const nextRootReducer = require("./reducers/rootReducer").default;
//     store.replaceReducer(nextRootReducer);
//   });
// }

export default store;
