//合并所有reducer并返回
import { combineReducers } from "redux";
import { user } from "./redux/user_redux";
import { part } from "./redux/part_redux";

export default combineReducers({user,part})