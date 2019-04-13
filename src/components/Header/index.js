import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchWrapper,SearchInfo,SearchInfoTitle,SearchInfoSwitch,SearchInfoList,SearchInfoItem } from "./style";
import Avatar from './avatar';
import { connect } from 'react-redux';
import { detailFind } from '../../redux/detail_redux';
import { charpterFind } from '../../redux/charpter_redux';
import { partFind } from '../../redux/part_redux';
import { getHeaderList,changePage } from '../../redux/header_redux'

@connect(
    state=>({
        username: state.user.username,
        headerlist: state.header.list,
        page: state.header.page,
        totalPage: state.header.totalPage,
    }),
    {detailFind,charpterFind,partFind,getHeaderList,changePage}
)
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            mousein: false,
            find: ''
        }
        this.handleInputFocus = this.handleInputFocus.bind(this)
        this.handleInputBlur = this.handleInputBlur.bind(this)
    }
    componentDidMount(){
        this.props.getHeaderList();
        const { find } = this.props;
        this.setState({find});
    }
    changeFind(value){
        let { find } = this.state;
        find = value;
        this.setState({find})
    }
    find() {
        const { find } = this.state
        if(find){
            this.props.detailFind(this.state);
            this.props.charpterFind(this.state);
            this.props.partFind(this.state);
        }
    }
    findone(find) {
        const data = {
            find: find
        }
        this.props.detailFind(data);
        this.props.charpterFind(data);
        this.props.partFind(data);
    }
    handleInputFocus() {
        this.setState({
            focused: true,
        })
    }
    handleInputBlur() {
        this.setState({
            focused: false,
        })
    }
    handleMouseEnter(){
        this.setState({
            mousein: true,
        })
    }
    handleMouseLeave(){
        this.setState({
            mousein: false,
        })
    }
    handleChangePage(page,totalPage,spin){
        //取图标的现在的旋转角度（spin.style.transform为rotate(xxdeg)）
        let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');//如果不为0-9的数据，就取空
        if(originAngle) {
            originAngle = parseInt(originAngle, 10);//originAngle转化成10机制的数字
        }else {
            originAngle = 0;
        }
        spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
        this.props.changePage(page,totalPage)
    }
    getListArea(){
        const { headerlist,page,totalPage } = this.props;
        const { focused,mousein } = this.state;
        const pageList = [];
        if(headerlist.length){
            for (let i = (page-1)*10; i < page*10; i++) {
                if(headerlist[i]){
                    pageList.push(headerlist[i])
                }
            }
        }
        // console.log(pageList)
        if(focused || mousein){
            return (
                <SearchInfo
                    onMouseEnter={()=>{this.handleMouseEnter()}}
                    onMouseLeave={()=>{this.handleMouseLeave()}}
                >
                    <div className="arrow" ></div>
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch 
                            onClick={()=>this.handleChangePage(page,totalPage,this.spinIcon)}
                        >
                            <i ref={(icon) => {this.spinIcon = icon}} className='iconfont spin'>&#xe851;</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList.map((page)=>(
                            // console.log(page)
                            <Link key={page} to={{
                                pathname: '/find',
                                find: page,
                            }}><SearchInfoItem onClick={()=>this.findone(page)}>{page}</SearchInfoItem></Link>
                        ))}
                    </SearchInfoList>
                </SearchInfo>
            )
        }
    }
    render() {
        const { username,path } = this.props;
        const { find } = this.state;
        // console.log(find);
        // console.log(this.props.detailfindlist)
        // console.log(this.props.headerlist)
        return (
            <HeaderWrapper>
                <Link to="/">
                    <Logo/>
                </Link>
                <Nav>
                    <Link to="/"><NavItem className='left active'>英语点读平台首页</NavItem></Link>
                    {username? null:<Link to={{pathname:'/login', link:path}}><NavItem className='right'>登录</NavItem></Link>}
                    <SearchWrapper>
                        <CSSTransition
                            in={this.state.focused}
                            timeout={500}
                            classNames="slide"
                        >
                            <NavSearch
                                className={this.state.focused ? 'focused' : ''}
                                onFocus={this.handleInputFocus}
                                onBlur={this.handleInputBlur}
                                value={find}
                                onChange={(e) => {
                                    this.changeFind(e.target.value)
                                }}
                            />
                        </CSSTransition>
                        {find?<Link to={{
                            pathname: '/find',
                            find: find,
                        }}>
                            <i 
                                className={this.state.focused ? 'focused iconfont zoom' : 'iconfont zoom'}
                                onClick={()=>this.find()}>&#xe60b;</i>
                        </Link>:<i 
                            className={this.state.focused ? 'focused iconfont zoom' : 'iconfont zoom'}
                            style={{cursor: 'pointer'}}>&#xe60b;</i>}
                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    {username? 
                        <span style={{float: "right", marginRight: 30 }}>
                            <Avatar/>
                        </span> :<Link to={{pathname:'/register',link:path}}><Button>注册</Button></Link>}
                </Addition>
            </HeaderWrapper>
        )
    }
}

export default Header;