import axios from 'axios';

const CONTENTLIST_SUCCESS = 'CONTENTLIST_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const initState={
    msg: '',
    contentid:'',
    detailid:'',
    chinese: "",
    english: "",
    //偏移时间（单位：ms）
    offset: '',
    //持续时间（单位：ms）
    duration: '',
    created: '',
    list: [],
}

//reducer
export function content(state=initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg:action.msg,redirectTo:action.payload,...action.payload}
        case CONTENTLIST_SUCCESS:
            return {...state, msg:action.msg,redirectTo:action.payload,list:action.payload, ...action.payload}
        case ERROR_MSG:
            return {...state, msg:action.msg}
        default:
            return state
    }
}
function getcontentlistSuccess(data) {
    return { type:CONTENTLIST_SUCCESS, payload:data}
}
function authSuccess(data){
	return { type:AUTH_SUCCESS, payload:data}
}
function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}

export function remove(data) {
    return dispatch=>{
        axios.post('/content/remove', data)
            .then(res=>{
                if (res.status===200) {
                    dispatch(authSuccess(res.data.data))
                    axios.get('/content/list')
                        .then(res => {
                            dispatch(getcontentlistSuccess(res.data.data))
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
        axios.post('/content/update', data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    axios.get('/content/list')
                        .then(res => {
                            dispatch(getcontentlistSuccess(res.data.data))
                        })
				}else{
					dispatch(errorMsg(res.data.msg))
				}
            })
    }
}

export function getContentList() {
    return dispatch=>{
        axios.get('/content/list')
            .then(res=>{
                if(res.status===200){
                    dispatch(getcontentlistSuccess(res.data.data))
                }
            })
    }
}

export function create({contentid,detailid,chinese,english,offset,duration,created}) {
    if(!contentid || !detailid ||!chinese || !english || !offset || !duration) {
        return errorMsg('ContentID,DetailID和语句的中英文和对于语句的音频偏移时间和持续时间必须输入')
    }
    return dispatch=>{
        axios.post('/content/create',{contentid,detailid,chinese,english,offset,duration,created})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({contentid,detailid,chinese,english,offset,duration,created}))
                axios.get('/content/list')
                    .then(res => {
                        dispatch(getcontentlistSuccess(res.data.data))
                    })
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}