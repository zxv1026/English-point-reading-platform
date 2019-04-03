import axios from 'axios';
import { message } from 'antd';

const COLLECTION_SUCCESS = 'COLLECTION_SUCCESS';
const COLLECTION_ERROR = 'COLLECTION_ERROR';

const initState={
    collect: '',
    created: '',
}

//reducer
export function collectrecord(state=initState, action) {
    switch (action.type) {
        case COLLECTION_SUCCESS:
            return {...state, ...action.payload}
        case COLLECTION_ERROR:
            return {...initState,}
        default:
            return state
    }
}

function authSuccess(data){
	return { type:COLLECTION_SUCCESS, payload:data}
}
function CollectiononeError(){
	return { type:COLLECTION_ERROR }
}

//查看该用户在该detail下的是否点过赞
export function getCollectionOne(data) {
    return dispatch => {
        axios.post('/collectrecord/one', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(CollectiononeError())
                }
            })
    }
}

export function removeCollection(id) {
    const data = {
        _id: id
    }
    return dispatch=>{
        axios.post('/collectrecord/remove', data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(CollectiononeError())
                    message.success(res.data.success);
				}else{
                    message.error(res.data.msg)
                }
            })
    }
}

export function createCollection({userID,detailID,collect,created}) {
    return dispatch=>{
        axios.post('/collectrecord/create',{userID,detailID,collect,created})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({userID,detailID,collect,created}))
                message.success(res.data.success);
            }else{
                message.error(res.data.msg)
            }
        })
    }
}