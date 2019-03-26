import axios from 'axios';

const USERLIST_SUCCESS = 'USERLIST_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const initState={
    redirectTo: '',
    msg: '',
    username: '',
    password: '',
    type: '',
    created: '',
    list: [],
}

//reducer
export function user(state=initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg:'',redirectTo:action.payload,...action.payload}
        case USERLIST_SUCCESS:
            return {...state, msg:'',redirectTo:action.payload,list:action.payload, ...action.payload}
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

export function remove(data) {
    return dispatch=>{
        axios.post('/user/remove', data)
            .then(res=>{
                if (res.status===200) {
                    dispatch(authSuccess(res.data.data))
                    axios.get('/user/list')
                        .then(res => {
                            dispatch(getuserlistSuccess(res.data.data))
                        })
				}else{
					dispatch(errorMsg(res.data.msg))
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
                    axios.get('/user/list')
                        .then(res => {
                            dispatch(getuserlistSuccess(res.data.data))
                        })
				}else{
					dispatch(errorMsg(res.data.msg))
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
        return errorMsg('用户名密码必须输入')
    }
    return dispatch=>{
		axios.post('/user/login',{username,password})
			.then(res=>{
				if (res.status===200&&res.data.code===0) {
					// dispatch(registerSuccess({user,pwd,type}))
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})		
	}
}

export function register({username,password,repeatpassword,type,avatar,created}) {
    if(!username || !password) {
        return errorMsg('用户名密码必须输入')
    }
    if(password!==repeatpassword){
        return errorMsg('密码和确认密码不同')
    }
    return dispatch=>{
        axios.post('/user/register',{username,password,type,avatar,created})
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({username,password,type,avatar,created}))
                axios.get('/user/list')
                    .then(res => {
                        dispatch(getuserlistSuccess(res.data.data))
                    })
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}