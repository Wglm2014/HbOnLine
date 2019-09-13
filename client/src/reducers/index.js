import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import budgetline from "./budgetline";
import movements from "./movements";
export default combineReducers({ alert, auth, budgetline, movements });