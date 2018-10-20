import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import pollsReducer from "./polls";
import authReducer from "./auth";
import pollFormReducer from "./pollForm";
import signUpFormReducer from "./signUpForm";
import userReducer from "./user";
import pollListSortReducer from "./pollListSort";

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  polls: pollsReducer,
  pollForm: pollFormReducer,
  signUpForm: signUpFormReducer,
  user: userReducer,
  pollListSort: pollListSortReducer
});

export default rootReducer;
