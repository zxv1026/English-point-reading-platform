import axios from 'axios';
import { message } from 'antd';

const PARTLIST_SUCCESS = 'PARTLIST_SUCCESS';
const PART_SUCCESS = 'PART_SUCCESS';

const initState={
    partid:'',
    name: '',
    created: '',
    likenum: 0,
    collectnum: 0,
    partlist: [],
}

//reducer
export function part(state=initState, action) {
    switch (action.type) {
        case PART_SUCCESS:
            return {...state, ...action.payload}
        case PARTLIST_SUCCESS:
            return {...state, partlist:action.payload, ...action.payload}
        default:
            return state
    }
}
function getpartlistSuccess(data) {
    return { type:PARTLIST_SUCCESS, payload:data}
}
function authSuccess(data){
	return { type:PART_SUCCESS, payload:data}
}


export function remove(data) {
    return dispatch=>{
        axios.post('/part/remove', data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success, 5);
                    axios.get('/part/list')
                        .then(res => {
                            dispatch(getpartlistSuccess(res.data.data))
                        })
				}else{
                    message.error(res.data.msg, 5)
                }
            })
    }
}

//更新点赞数和收藏数
export function updatepartlikenum(id, data) {
    data.partid = id;
    return dispatch => {
        axios.post('/part/updatelikenum', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    message.error(res.data.msg, 5)
                }
            })
    }
}

export function update(_id,data) {
    data._id = _id;
    return dispatch=>{
        axios.post('/part/update',data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success, 5);
                    axios.get('/part/list')
                        .then(res => {
                            dispatch(getpartlistSuccess(res.data.data))
                        })
				}else{
                    message.error(res.data.msg, 5)
				}
            })
    }
}

export function getPartOne(data) {
    console.log(data)
    return dispatch => {
        axios.post('/part/one', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                }
            })
    }
}

export function getPartList() {
    return dispatch=>{
        axios.get('/part/list')
            .then(res=>{
                if(res.status===200){
                    dispatch(getpartlistSuccess(res.data.data))
                }
            })
    }
}

export function create({partid,name,created,likenum,collectnum}) {
    if(!partid || !name) {
        message.error('PartID和名称必须输入', 5)
    }
    return dispatch=>{
        axios.post('/part/create',{partid,name,created,likenum,collectnum})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({partid,name,created,likenum,collectnum}))
                message.success(res.data.success,5);
                axios.get('/part/list')
                    .then(res => {
                        dispatch(getpartlistSuccess(res.data.data))
                    })
            }else{
                message.error(res.data.msg,5)
            }
        })
    }
}