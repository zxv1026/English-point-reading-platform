import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchWrapper } from "./style";
import Avatar from './avatar';
import { connect } from 'react-redux';
import { find } from '../../redux/detail_redux'

@connect(
    state=>({
        username: state.user.username,
        detailfindlist: state.detail.detailfindlist
    }),
    {find}
)
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            find: ''
        }
        this.handleInputFocus = this.handleInputFocus.bind(this)
        this.handleInputBlur = this.handleInputBlur.bind(this)
    }
    changeFind(value){
        let { find } = this.state;
        find = value;
        this.setState({find})
    }
    find() {
        const { find } = this.state
        if(find){
            this.props.find(this.state)
        }
    }
    render() {
        const { username,path } = this.props;
        const { find } = this.state;
        // console.log(this.props.detailfindlist)
        return (
            <HeaderWrapper>
                <Link to="/"><Logo/></Link>
                <Nav>
                    <Link to="/"><NavItem className='left active'>首页</NavItem></Link>
                    {username? null:<Link to={{pathname:'/login', link:path}}><NavItem className='right'>登录</NavItem></Link>}
                    <SearchWrapper>
                        <CSSTransition
                            in={this.state.focused}
                            timeout={200}
                            classNames="slide"
                        >
                            <NavSearch
                                className={this.state.focused ? 'focused' : ''}
                                onFocus={this.handleInputFocus}
                                onBlur={this.handleInputBlur}
                                onChange={(e) => {
                                    this.changeFind(e.target.value)
                                }}
                            >
                            </NavSearch>
                        </CSSTransition>
                        {find?<Link to={{
                            pathname: '/find',
                        }}>
                            <i 
                                className={this.state.focused ? 'focused iconfont' : 'iconfont'}
                                onClick={()=>this.find()}>&#xe60b;</i>
                        </Link>:<i 
                            className={this.state.focused ? 'focused iconfont' : 'iconfont'}
                            style={{cursor: 'pointer'}}>&#xe60b;</i>}
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
}

export default Header;