import axios from 'axios';
import { message } from 'antd';

const CHARPTERLIST_SUCCESS = 'CHARPTERLIST_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';

const initState={
    charpterid:'',
    partid:'',
    name: '',
    created: '',
    charpterlist: [],
}

//reducer
export function charpter(state=initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state,...action.payload}
        case CHARPTERLIST_SUCCESS:
            return {...state,charpterlist:action.payload, ...action.payload}
        default:
            return state
    }
}
function getcharpterlistSuccess(data) {
    return { type:CHARPTERLIST_SUCCESS, payload:data}
}
function authSuccess(data){
	return { type:AUTH_SUCCESS, payload:data}
}


export function remove(data) {
    return dispatch=>{
        axios.post('/charpter/remove', data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success, 5);
                    axios.get('/charpter/list')
                        .then(res => {
                            dispatch(getcharpterlistSuccess(res.data.data))
                        })
				}else{
                    message.error(res.data.msg, 5)
                }
            })
    }
}

export function update(_id,data) {
    data._id = _id;
    return dispatch=>{
        axios.post('/charpter/update', data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success, 5);
                    axios.get('/charpter/list')
                        .then(res => {
                            dispatch(getcharpterlistSuccess(res.data.data))
                        })
				}else{
                    message.error(res.data.msg, 5)
				}
            })
    }
}

export function getCharpterList() {
    return dispatch=>{
        axios.get('/charpter/list')
            .then(res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(getcharpterlistSuccess(res.data.data))
                }
            })
    }
}

export function getCharpterListOne(data) {
    console.log(data)
    return dispatch=>{
        axios.post('/charpter/listone',data)
            .then(res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(getcharpterlistSuccess(res.data.data))
                }
            })
    }
}

export function create({charpterid,partid,name,created}) {
    if(!charpterid || !partid ||!name) {
        message.error('CharpterID,PartID和名称必须输入', 5)
    }
    return dispatch=>{
        axios.post('/charpter/create',{charpterid,partid,name,created})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({charpterid,partid,name,created}))
                message.success(res.data.success, 5);
                axios.get('/charpter/list')
                    .then(res => {
                        dispatch(getcharpterlistSuccess(res.data.data))
                    })
            }else{
                message.error(res.data.msg, 5)
            }
        })
    }
}