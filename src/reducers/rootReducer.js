import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import pollsReducer from "./polls";
import authReducer from "./auth";
import pollFormReducer from "./pollForm";
import userReducer from "./user";

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  polls: pollsReducer,
  pollForm: pollFormReducer,
  user: userReducer
});

export default rootReducer;
