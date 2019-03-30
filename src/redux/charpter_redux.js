import axios from 'axios';

const CHARPTERLIST_SUCCESS = 'CHARPTERLIST_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const initState={
    msg: '',
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
            return {...state, msg:action.msg,redirectTo:action.payload,...action.payload}
        case CHARPTERLIST_SUCCESS:
            return {...state, msg:action.msg,redirectTo:action.payload,charpterlist:action.payload, ...action.payload}
        case ERROR_MSG:
            return {...state, msg:action.msg}
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
function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}

export function remove(data) {
    return dispatch=>{
        axios.post('/charpter/remove', data)
            .then(res=>{
                if (res.status===200) {
                    dispatch(authSuccess(res.data.data))
                    axios.get('/charpter/list')
                        .then(res => {
                            dispatch(getcharpterlistSuccess(res.data.data))
                        })
				}else{
					dispatch(errorMsg(res.data.msg))
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
                    axios.get('/charpter/list')
                        .then(res => {
                            dispatch(getcharpterlistSuccess(res.data.data))
                        })
				}else{
					dispatch(errorMsg(res.data.msg))
				}
            })
    }
}

export function getCharpterList() {
    return dispatch=>{
        axios.get('/charpter/list')
            .then(res=>{
                if(res.status===200){
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
                if(res.status===200){
                    dispatch(getcharpterlistSuccess(res.data.data))
                }
            })
    }
}

export function create({charpterid,partid,name,created}) {
    if(!charpterid || !partid ||!name) {
        return errorMsg('CharpterID,PartID和名称必须输入')
    }
    return dispatch=>{
        axios.post('/charpter/create',{charpterid,partid,name,created})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({charpterid,partid,name,created}))
                axios.get('/charpter/list')
                    .then(res => {
                        dispatch(getcharpterlistSuccess(res.data.data))
                    })
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}