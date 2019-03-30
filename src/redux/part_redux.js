import axios from 'axios';

const PARTLIST_SUCCESS = 'PARTLIST_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const initState={
    msg: '',
    partid:'',
    name: '',
    created: '',
    partlist: [],
}

//reducer
export function part(state=initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg:action.msg,redirectTo:action.payload,...action.payload}
        case PARTLIST_SUCCESS:
            return {...state, msg:action.msg,redirectTo:action.payload,partlist:action.payload, ...action.payload}
        case ERROR_MSG:
            return {...state, msg:action.msg}
        default:
            return state
    }
}
function getpartlistSuccess(data) {
    return { type:PARTLIST_SUCCESS, payload:data}
}
function authSuccess(data){
	return { type:AUTH_SUCCESS, payload:data}
}
function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}

export function remove(data) {
    return dispatch=>{
        axios.post('/part/remove', data)
            .then(res=>{
                if (res.status===200) {
                    dispatch(authSuccess(res.data.data))
                    axios.get('/part/list')
                        .then(res => {
                            dispatch(getpartlistSuccess(res.data.data))
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
        axios.post('/part/update',data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    axios.get('/part/list')
                        .then(res => {
                            dispatch(getpartlistSuccess(res.data.data))
                        })
				}else{
					dispatch(errorMsg(res.data.msg))
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

export function create({partid,name,created}) {
    if(!partid || !name) {
        return errorMsg('PartID和名称必须输入')
    }
    return dispatch=>{
        axios.post('/part/create',{partid,name,created})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({partid,name,created}))
                axios.get('/part/list')
                    .then(res => {
                        dispatch(getpartlistSuccess(res.data.data))
                    })
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}