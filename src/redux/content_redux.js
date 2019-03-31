import axios from 'axios';
import { message } from 'antd';

const CONTENTLIST_SUCCESS = 'CONTENTLIST_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';

const initState={
    contentid:'',
    detailid:'',
    chinese: "",
    english: "",
    //偏移时间（单位：ms）
    offset: '',
    //持续时间（单位：ms）
    duration: '',
    created: '',
    contentlist: [],
}

//reducer
export function content(state=initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state,...action.payload}
        case CONTENTLIST_SUCCESS:
            return {...state,contentlist:action.payload, ...action.payload}
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


export function remove(data) {
    return dispatch=>{
        axios.post('/content/remove', data)
            .then(res=>{
                if (res.status===200 && res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success, 5);
                    axios.get('/content/list')
                        .then(res => {
                            dispatch(getcontentlistSuccess(res.data.data))
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
        axios.post('/content/update', data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success, 5);
                    axios.get('/content/list')
                        .then(res => {
                            dispatch(getcontentlistSuccess(res.data.data))
                        })
				}else{
                    message.error(res.data.msg, 5)
				}
            })
    }
}

export function getContentList() {
    return dispatch=>{
        axios.get('/content/list')
            .then(res=>{
                if(res.status===200 && res.data.code===0){
                    dispatch(getcontentlistSuccess(res.data.data))
                }
            })
    }
}

export function getContentListOne(data) {
    console.log(data)
    return dispatch => {
        axios.post('/content/listone', data)
            .then(res => {
                if (res.status === 200 && res.data.code===0) {
                    dispatch(getcontentlistSuccess(res.data.data))
                }
            })
    }
}

export function create({contentid,detailid,chinese,english,offset,duration,created}) {
    if(!contentid || !detailid ||!chinese || !english || !offset || !duration) {
        message.error('ContentID,DetailID和语句的中英文和对于语句的音频偏移时间和持续时间必须输入', 5)
    }
    return dispatch=>{
        axios.post('/content/create',{contentid,detailid,chinese,english,offset,duration,created})
            .then(res=>{
                if(res.status===200 && res.data.code===0){
                    dispatch(authSuccess({contentid,detailid,chinese,english,offset,duration,created}))
                    message.success(res.data.success, 5);
                    axios.get('/content/list')
                        .then(res => {
                            dispatch(getcontentlistSuccess(res.data.data))
                        })
                }else{
                    message.error(res.data.msg, 5)
                }
            })
    }
}