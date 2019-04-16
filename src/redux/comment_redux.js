import axios from 'axios';
import { message } from 'antd';

const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
const COMMENTLIST_SUCCESS = 'COMMENTLIST_SUCCESS';

const initState={
    list: []
}

//reducer
export function comment(state = initState, action) {
    switch (action.type) {
        case COMMENT_SUCCESS:
            return {...state, ...action.payload}
        case COMMENTLIST_SUCCESS:
            return {...state, list:action.payload}
        default:
            return state
    }
}

function authSuccess(data){
	return { type:COMMENT_SUCCESS, payload:data}
}
function ListSuccess(data){
	return { type:COMMENTLIST_SUCCESS, payload:data}
}


//查看该话题下的用户的评论
export function getCommentList(data) {
    console.log('list')
    return dispatch => {
        axios.post('/comment/list', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(ListSuccess(res.data.data))
                }
            })
    }
}

export function removeComment(id, detailid) {
    const data = {
        _id: id
    }
    const detaildata = {
        detailID: detailid
    }
    return dispatch=>{
        axios.post('/comment/remove', data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    message.success(res.data.success);
                    axios.post('/comment/list', detaildata)
                        .then(res => {
                            if (res.status === 200 && res.data.code === 0) {
                                dispatch(ListSuccess(res.data.data))
                            }
                        })
				}else{
                    message.error(res.data.msg)
                }
            })
    }
}

export function createComment({userID,detailID,comment,created}) {
    return dispatch=>{
        axios.post('/comment/create',{userID,detailID,comment,created})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({userID,detailID,comment,created}))
                message.success(res.data.success);
                axios.post('/comment/list', {detailID})
                    .then(res => {
                        if (res.status === 200 && res.data.code === 0) {
                            dispatch(ListSuccess(res.data.data))
                        }
                    })
            }else{
                message.error(res.data.msg)
            }
        })
    }
}