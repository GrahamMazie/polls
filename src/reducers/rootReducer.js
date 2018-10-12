import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import data from "./polls";
import auth from "./auth";

const rootReducer = combineReducers({
  router: routerReducer,
  auth,
  data
});

export default rootReducer;
