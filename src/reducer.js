//合并所有reducer并返回
import { combineReducers } from "redux";
import { user } from "./redux/user_redux";
import { part } from "./redux/part_redux";
import { charpter } from "./redux/charpter_redux";
import { detail } from "./redux/detail_redux";
import { content } from "./redux/content_redux";
// import { tag } from "./redux/tag_redux";
import { likerecord } from "./redux/likerecord_redux";
import { collectrecord } from "./redux/collectrecord_redux";
import { header } from "./redux/header_redux";
import { comment } from "./redux/comment_redux";

export default combineReducers({user,part,charpter,detail,content,likerecord,collectrecord,header,comment})