import axios from 'axios';

const DETAILLIST_SUCCESS = 'DETAILLIST_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const initState={
    msg: '',
    detailid:'',
    charpterid:'',
    name: '',
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
        case ERROR_MSG:
            return {...state, msg:action.msg}
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
function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}

export function remove(data) {
    return dispatch=>{
        axios.post('/detail/remove', data)
            .then(res=>{
                if (res.status===200) {
                    dispatch(authSuccess(res.data.data))
                    axios.get('/detail/list')
                        .then(res => {
                            dispatch(getdetaillistSuccess(res.data.data))
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
        axios.post('/detail/update', data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    axios.get('/detail/list')
                        .then(res => {
                            dispatch(getdetaillistSuccess(res.data.data))
                        })
				}else{
					dispatch(errorMsg(res.data.msg))
				}
            })
    }
}

export function getDetailList() {
    return dispatch=>{
        axios.get('/detail/list')
            .then(res=>{
                if(res.status===200){
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
                if (res.status === 200) {
                    dispatch(getdetaillistSuccess(res.data.data))
                }
            })
    }
}

export function create({detailid,charpterid,name,created}) {
    if(!detailid || !charpterid ||!name) {
        return errorMsg('DetailID,CharpterID和名称必须输入')
    }
    return dispatch=>{
        axios.post('/detail/create',{detailid,charpterid,name,created})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({detailid,charpterid,name,created}))
                axios.get('/detail/list')
                    .then(res => {
                        dispatch(getdetaillistSuccess(res.data.data))
                    })
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}