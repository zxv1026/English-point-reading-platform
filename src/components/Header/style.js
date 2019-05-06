import styled from 'styled-components';
import logoPic from "../../assets/images/log.png";

export const HeaderWrapper = styled.div`
    z-index: 2;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    height: 56px;
    background-color: #fff;
    border-bottom: 1px solid #777;
    border-color: #f0f0f0;
`;

export const Logo = styled.div`
    float: left;
    height: 56 px;
    width: 95px;
    height: 55px;
    background: url(${logoPic});
    background-size: contain;
`;

export const Nav = styled.div`
    width: 1100px;
    height: 100%;
    padding-right: 30px;
    box-sizing: border-box;
    margin: 0 auto;
`;

export const NavItem = styled.div`
    line-height: 56px;
    padding: 0 15px;
    font-size: 17px;
    color: #969696;
    &.left {
        float: left;
    }
    &.right {
        float: right;
        font-size: 15px;
    }
    &.active {
        color: #ea6f5a;
    }
`;

export const SearchWrapper = styled.div`
    position: relative;
    float: left;
    .zoom {
        position: absolute;
        right: 5px;
        bottom: 5px;
        width: 30px;
        line-height: 30px;
        border-radius: 15px;
        text-align: center;
        color: #969696;
        &.focused {
            background: #777;
            color: #fff;
        }
    }
`;

export const NavSearch = styled.input.attrs({
    placeholder: '搜索'
})`
    width: 160px;
    height: 38px;
    padding: 0 40px 0 20px;
    margin-top: 9px;
    margin-left: 20px;
    box-sizing: border-box;
    border: none;
    outline: none;
    border-radius: 19px;
    background: #eee;
    font-size: 14px;
    &::placeholder {
        color: #999;
    }
    &.focused {
        width: 220px;
    }
    &.slide-enter {
        transition: all .5s ease-out;
    }
    &.slide-enter-active {
        width: 220px;
    }
    &.slide-exit {
        transition: all .5s ease-out;
    }
    &.slide-exit-active {
        width: 160px;
    }
`;

export const SearchInfo = styled.div`
	position: absolute;
	left: 20px;
	top: 59px;
	width: 250px;
	padding: 0 20px 10px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
    border-radius: 4px;
    background-color: #fff;
    .arrow {   
        position: absolute;
        width: 0;
        height: 0;
        border: 12px solid transparent;
        border-bottom-color: #fff;
        left: 20px;
        bottom: 99%; 
    }  
`;

export const SearchInfoTitle = styled.div`
	margin-top: 20px;
	margin-bottom: 15px;
	line-height: 20px;
	font-size: 14px;
	color: #969696;
`;

export const SearchInfoSwitch = styled.span`
	float: right;
	font-size: 13px;
	cursor: pointer;
	.spin {
		display: block;
		float: left;
		font-size: 12px;
		margin-right: 2px;
		transition: all .2s ease-in;
		transform-origin: center center;
    }
    :hover {
        color: #2f2f2f;
    }
`;

export const SearchInfoList = styled.div`
	overflow: hidden;
`;

export const SearchInfoItem = styled.span`
	display: block;
	float: left;
	line-height: 20px;
	padding: 0 5px;
	margin-right: 10px;
	margin-bottom: 15px;
	font-size: 12px;
	border: 1px solid #ddd;
	color: #787878;
    border-radius: 3px;
    :hover {
        color: #333;
        border-color: #b4b4b4;
    }
`;

export const Addition = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 56px;
`;
export const Button = styled.div`
    float: right;
    margin-top: 9px;
    margin-right: 20px;
    padding: 0 20px;
    line-height: 38px;
    border-radius: 19px;
    border: 1px solid #ec6149;
    font-size: 15px;
    color: #ec6149;
`;
