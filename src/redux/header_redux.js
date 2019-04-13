import axios from 'axios';
import { message } from 'antd';

const HeaderList_SUCCESS = 'HeaderList_SUCCESS';
const CHANGE_PAGE = 'CHANGE_PAGE';

const initState={
    list: [],
    page: 1,
    totalPage: 1,
}

//reducer
export function header(state=initState, action) {
    switch (action.type) {
        case HeaderList_SUCCESS:
            return {...state,list: action.payload,totalPage:action.totalPage}
        case CHANGE_PAGE:
            return {...state,page:action.page}
        default:
            return state
    }
}

function getheaderlist(data) {
	return { type:HeaderList_SUCCESS, payload:data, totalPage:Math.ceil(data.length/10)}
}
function changepage(page){
    return { type:CHANGE_PAGE, page}
}


export function changePage(page,totalPage){
    return dispatch => {
        if(page<totalPage){
            dispatch(changepage(page+1));
        }else{
            dispatch(changepage(1));
        }
    }
}

export function getHeaderList() {
    return dispatch => {
        //获取后端传过来的搜索列表数据
        // axios.post('/api/headerList.json', data)
        //     .then(res => {
        //         if (res.status === 200 && res.data.code === 0) {
        //             dispatch(getheaderlist(res.data.data))
        //         } else {
        //             message.error(res.data.msg)
        //         }
        //     })
        const datalist = ["起床", "一天", "英文", "年龄", "表达", "妈妈", "爸爸", "早晨", "回家", "下课", "孩子", "家事", "晚上", "理由", "游戏", "介绍", "表现", "学校", "活动", "老师", "沟通", "洗澡", "感谢", "东西", "球", "性格", "天"];
        dispatch(getheaderlist(datalist))
    }
}