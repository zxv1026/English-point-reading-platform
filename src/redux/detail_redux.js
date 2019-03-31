import axios from 'axios';
import { message } from 'antd';

const DETAILLIST_SUCCESS = 'DETAILLIST_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';

const initState={
    detailid:'',
    charpterid:'',
    name: '',
    mp3: '',
    created: '',
    detaillist: [],
}

//reducer
export function detail(state=initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg:action.msg,redirectTo:action.payload,...action.payload}
        case DETAILLIST_SUCCESS:
            return {...state, msg:action.msg,redirectTo:action.payload,detaillist:action.payload, ...action.payload}
        default:
            return state
    }
}
function getdetaillistSuccess(data) {
    return { type:DETAILLIST_SUCCESS, payload:data}
}
function authSuccess(data){
	return { type:AUTH_SUCCESS, payload:data}
}


export function remove(data) {
    return dispatch=>{
        axios.post('/detail/remove', data)
            .then(res=>{
                if (res.status===200&& res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success, 5);
                    axios.get('/detail/list')
                        .then(res => {
                            dispatch(getdetaillistSuccess(res.data.data))
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
        axios.post('/detail/update', data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success, 5);
                    axios.get('/detail/list')
                        .then(res => {
                            dispatch(getdetaillistSuccess(res.data.data))
                        })
				}else{
                    message.error(res.data.msg, 5)
				}
            })
    }
}

export function getDetailList() {
    return dispatch=>{
        axios.get('/detail/list')
            .then(res=>{
                if(res.status===200&& res.data.code===0){
                    dispatch(getdetaillistSuccess(res.data.data))
                }
            })
    }
}

export function getDetailListOne(data) {
    console.log(data)
    return dispatch => {
        axios.post('/detail/listone', data)
            .then(res => {
                if (res.status === 200&& res.data.code===0) {
                    dispatch(getdetaillistSuccess(res.data.data))
                }
            })
    }
}

export function getDetailOne(data) {
    console.log(data)
    return dispatch => {
        axios.post('/detail/one', data)
            .then(res => {
                if (res.status === 200&& res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                }
            })
    }
}

export function create({detailid,charpterid,name,mp3,created}) {
    if(!detailid || !charpterid ||!name) {
        message.error('DetailID,CharpterID和名称必须输入', 5)
    }
    return dispatch=>{
        axios.post('/detail/create',{detailid,charpterid,name,mp3,created})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({detailid,charpterid,name,mp3,created}))
                message.success(res.data.success, 5);
                axios.get('/detail/list')
                    .then(res => {
                        dispatch(getdetaillistSuccess(res.data.data))
                    })
            }else{
                message.error(res.data.msg, 5)
            }
        })
    }
}