import axios from 'axios';
import { message } from 'antd';

const USERLIST_SUCCESS = 'USERLIST_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOG_OUT = 'LOG_OUT';
const ERROR_MSG = 'ERROR_MSG';
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
}

//reducer
export function user(state=initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state,redirectTo:action.payload,listone:action.payload,...action.payload}
        case USERLIST_SUCCESS:
            return {...state,list:action.payload, ...action.payload}
        case LOG_OUT:
            return {...initState,}
        case ERROR_MSG:
            return {...state, msg:action.msg}
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

export function logout(){
    message.success('退出成功');
    return { type: LOG_OUT }
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

export function update(id,data) {
    data.id = id;
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if (res.status===200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                    message.success(res.data.success, 5);
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
        return errorMsg('用户名密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/register',{username,password,type,avatar,created})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({username,password,type,avatar,created}))
                message.success(res.data.success);
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