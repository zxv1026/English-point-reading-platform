import axios from 'axios';
import { message } from 'antd';

const LIKE_SUCCESS = 'LIKE_SUCCESS';
const LIKEONE_ERROR = 'LIKEONE_ERROR';

const initState={
    like: '',
    created: '',
}

//reducer
export function likerecord(state=initState, action) {
    switch (action.type) {
        case LIKE_SUCCESS:
            return {...state, ...action.payload}
        case LIKEONE_ERROR:
            return {...initState,}
        default:
            return state
    }
}

function authSuccess(data){
	return { type:LIKE_SUCCESS, payload:data}
}
function LikeoneError(){
	return { type:LIKEONE_ERROR }
}

//查看该用户在该detail下的是否点过赞(如：在起床这个话题是否点过赞)
export function getone(data) {
    return dispatch => {
        axios.post('/likerecord/one', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(LikeoneError())
                }
            })
    }
}
//用户已经在该话题下点赞过，清除
export function remove(id) {
    const data = {
        _id: id
    }
    return dispatch=>{
        axios.post('/likerecord/remove', data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(LikeoneError())
                    message.success(res.data.success, 5);
				}else{
                    message.error(res.data.msg)
                }
            })
    }
}
//用户没有在该话题下点赞过，创建
export function create({userID,detailID,like,created}) {
    return dispatch=>{
        axios.post('/likerecord/create',{userID,detailID,like,created})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({userID,detailID,like,created}))
                message.success(res.data.success);
            }else{
                message.error(res.data.msg)
            }
        })
    }
}