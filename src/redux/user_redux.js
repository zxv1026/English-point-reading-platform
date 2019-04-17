import axios from 'axios';
import { message } from 'antd';

const USERLIST_SUCCESS = 'USERLIST_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOG_OUT = 'LOG_OUT';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_INFO = 'LOAD_INFO';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const EMPTY = 'EMPTY';
const initState={
    redirectTo: '',
    msg: '',
    username: '',
    password: '',
    avatar:'',
    type: '',
    created: '',
    list: [],
    listone: [],
    changeTo: '',
    logout: ''
}

//reducer
export function user(state=initState, action) {
    switch (action.type) {
        case LOAD_INFO:
            return {...state,...action.payload}
        case AUTH_SUCCESS:
            return {...state,redirectTo:action.payload,listone:action.payload,...action.payload}
        case USERLIST_SUCCESS:
            return {...state,list:action.payload, ...action.payload}
        case LOG_OUT:
            return {...initState,logout:true} 
        case CHANGE_PASSWORD:
            return {...initState,changeTo:action.payload} 
        case ERROR_MSG:
            return {...state, msg:action.msg}
        case EMPTY:
            return {msg:'',changeTo:''}
        default:
            return state
    }
}
function getuserlistSuccess(data) {
    return { type:USERLIST_SUCCESS, payload:data}
}
function authSuccess(data){
	return { type:AUTH_SUCCESS, payload:data}
}
function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}
function loadInfo(data) {
    return { type:LOAD_INFO, payload:data}
}
function logOut() {
    return { type: LOG_OUT }
}
function changePassword(data){
    return { type:CHANGE_PASSWORD, payload:data}
}

export function empty(){
    return { type:EMPTY }
}

//用户退出
export function logout(){
    return dispatch=>{
        axios.get('/user/logout')
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(logOut())
                    message.success(res.data.success);
                }
            })
    }
}

export function remove(data) {
    return dispatch=>{
        axios.post('/user/remove', data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success, 5);
                    axios.get('/user/list')
                        .then(res => {
                            dispatch(getuserlistSuccess(res.data.data))
                        })
				}else{
					message.error(res.data.msg);
                }
            })
    }
}
//重置用户密码
export function resetpassword(id, data) {
    data.id = id;
    return dispatch => {
        axios.post('/user/resetpassword', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success, 5);
                    //在后台管理中，当管理员更改用户后刷新用户列表
                    axios.get('/user/list')
                        .then(res => {
                            dispatch(getuserlistSuccess(res.data.data))
                        })
                } else {
                    dispatch(errorMsg(res.data.msg))
                    message.error(res.data.msg);
                }
            })
    }
}
//更改用户密码
export function changepassword(id, data) {
    data.id = id;
    if (!data.oldpassword || !data.password || !data.repeatpassword) {
        message.error('密码、确认密码必须输入');
        return errorMsg('密码、确认密码必须输入')
    }
    if(data.password!==data.repeatpassword){
        message.error('修改后的密码和确认密码不同');
        return errorMsg('修改后的密码和确认密码不同')
    }
    return dispatch => {
        axios.post('/user/changepassword', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(changePassword(res.data.data))
                    message.success(res.data.success, 5);
                } else {
                    dispatch(errorMsg(res.data.msg))
                    message.error(res.data.msg);
                }
            })
    }
}

export function update(id,data) {
    data.id = id;
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success, 5);
                    //在后台管理中，当管理员更改用户后刷新用户列表
                    axios.get('/user/list')
                        .then(res => {
                            dispatch(getuserlistSuccess(res.data.data))
                        })
				}else{
                    dispatch(errorMsg(res.data.msg))
                    message.error(res.data.msg);
				}
            })
    }
}

export function userFindList(data) {
    return dispatch => {
        axios.post('/user/findlist', data)
            .then(res => {
                if (res.status === 200) {
                    dispatch(getuserlistSuccess(res.data.data))
                }
            })
    }
}

export function getUserList() {
    return dispatch=>{
        axios.get('/user/list')
            .then(res=>{
                if(res.status===200){
                    dispatch(getuserlistSuccess(res.data.data))
                }
            })
    }
}

export function login({username,password}) {
    if(!username || !password) {
        message.error('用户名密码必须输入');
        return errorMsg('用户名密码必须输入')
    }
    return dispatch=>{
		axios.post('/user/login',{username,password})
			.then(res=>{
				if (res.status===200&&res.data.code===0) {
					// dispatch(registerSuccess({user,pwd,type}))
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success);
				}else{
                    dispatch(errorMsg(res.data.msg))
                    message.error(res.data.msg);
				}
			})		
	}
}

export function register({username,password,repeatpassword,type,avatar,created}) {
    if(!username || !password) {
        message.error('用户名密码必须输入');
        return errorMsg('用户名密码必须输入')
    }
    if(password!==repeatpassword){
        message.error('密码和确认密码不同');
        return errorMsg('密码和确认密码不同')
    }
    return dispatch=>{
        axios.post('/user/register',{username,password,type,avatar,created})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({username,password,type,avatar,created}))
                message.success(res.data.success);
                //在后台管理中，当管理员创建用户后刷新用户列表
                axios.get('/user/list')
                    .then(res => {
                        dispatch(getuserlistSuccess(res.data.data))
                    })
            }else{
                dispatch(errorMsg(res.data.msg))
                message.error(res.data.msg);
            }
        })
    }
}

//查找有没有cookie
export function loadinfo() {
    return dispatch=>{
        axios.get('/user/info')
            .then(res=>{
                if(res.status===200 && res.data.code===0){
                    dispatch(loadInfo(res.data.data))
                }
            })
    }
}