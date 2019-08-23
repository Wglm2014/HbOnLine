import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import budgetline from "./budgetline";
export default combineReducers({ alert, auth, budgetline });