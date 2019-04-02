import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchWrapper } from "./style";
import Avatar from './avatar';
import { connect } from 'react-redux';

@connect(
    state=>state.user,
)
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        }
        this.handleInputFocus = this.handleInputFocus.bind(this)
        this.handleInputBlur = this.handleInputBlur.bind(this)
    }
    render() {
        const { username } = this.props
        return (
            <HeaderWrapper>
                <Link to="/"><Logo/></Link>
                <Nav>
                    <Link to="/"><NavItem className='left active'>首页</NavItem></Link>
                    {username? null:<Link to="/login"><NavItem className='right'>登录</NavItem></Link>}
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
                            ></NavSearch>
                        </CSSTransition>
                        <i className={this.state.focused ? 'focused iconfont' : 'iconfont'}>&#xe60b;</i>
                    </SearchWrapper>
                </Nav>
                <Addition>
                    {username? 
                        <span style={{float: "right", marginRight: 30 }}>
                            <Avatar/>
                        </span> :<Link to="/register"><Button>注册</Button></Link>}
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