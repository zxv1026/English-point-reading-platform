import axios from 'axios';
import { message } from 'antd';

const CHARPTERLIST_SUCCESS = 'CHARPTERLIST_SUCCESS';
const CHARPTERLIKELIST_SUCCESS = 'CHARPTERLIKELIST_SUCCESS';
const CHARPTERCOLLECTLIST_SUCCESS = 'CHARPTERCOLLECTLIST_SUCCESS';
const CHARPTERLISTONE_SUCCESS = 'CHARPTERLISTONE_SUCCESS';
const CHARPTER_SUCCESS = 'CHARPTER_SUCCESS';

const initState={
    charpterid:'',
    partid:'',
    name: '',
    created: '',
    likenum: 0,
    collectnum: 0,
    charpterlist: [],
    likelist: [],
    collectlist: [],
    charpterlistone:[],
}

//reducer
export function charpter(state=initState, action) {
    switch (action.type) {
        case CHARPTER_SUCCESS:
            return {...state,...action.payload}
        case CHARPTERLIST_SUCCESS:
            return {...state,charpterlist:action.payload, ...action.payload}
        case CHARPTERLIKELIST_SUCCESS:
            return {...state,likelist:action.payload}
        case CHARPTERCOLLECTLIST_SUCCESS:
            return {...state,collectlist:action.payload}
        case CHARPTERLISTONE_SUCCESS:
            return {...state,charpterlistone:action.payload}
        default:
            return state
    }
}
function getcharpterlistoneSuccess(data) {
    return { type:CHARPTERLISTONE_SUCCESS, payload:data}
}
function getcharpterlikelistSuccess(data) {
    return { type:CHARPTERLIKELIST_SUCCESS, payload:data}
}
function getcharptercollectlistSuccess(data) {
    return { type:CHARPTERCOLLECTLIST_SUCCESS, payload:data}
}
function getcharpterlistSuccess(data) {
    return { type:CHARPTERLIST_SUCCESS, payload:data}
}
function authSuccess(data){
	return { type:CHARPTER_SUCCESS, payload:data}
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

//更新点赞数和收藏数
export function updatecharpterlikenum(id, data) {
    data.charpterid = id;
    return dispatch => {
        axios.post('/charpter/updatelikenum', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                    // axios.get('/detail/list')
                    //     .then(res => {
                    //         dispatch(getdetaillistSuccess(res.data.data))
                    //     })
                } else {
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

export function getCharpterOne(data) {
    console.log(data)
    return dispatch => {
        axios.post('/charpter/one', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                }
            })
    }
}

//获取点赞数前10
export function getCharpterLikeList() {
    return dispatch => {
        axios.get('/charpter/findlikenumlist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(getcharpterlikelistSuccess(res.data.data))
                }
            })
    }
}
//获取收藏数前10
export function getCharpterCollectList() {
    return dispatch => {
        axios.get('/charpter/findcollectnumlist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(getcharptercollectlistSuccess(res.data.data))
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
                    dispatch(getcharpterlistoneSuccess(res.data.data))
                }
            })
    }
}

export function create({charpterid,partid,name,created,likenum,collectnum}) {
    if(!charpterid || !partid ||!name) {
        message.error('CharpterID,PartID和名称必须输入', 5)
    }
    return dispatch=>{
        axios.post('/charpter/create',{charpterid,partid,name,created,likenum,collectnum})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({charpterid,partid,name,created,likenum,collectnum}))
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