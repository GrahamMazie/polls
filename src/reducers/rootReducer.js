import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import polls from "./polls";

const rootReducer = combineReducers({
  polls: polls,
  routing: routerReducer
});

export default rootReducer;
