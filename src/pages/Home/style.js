import styled from 'styled-components';
import { Carousel } from 'antd'
import img from "../../assets/images/ch40.jpg";

export const HomeWrapper = styled.div`
    overflow: hidden;
    width: 960px;
    margin: 0 auto;
`;

export const HomeLeft = styled.div `
    margin-left: 15px;
    margin-top: 30px;
    width: 625px;
    float: left;
    .banner-img{
        width: 625px;
        height: 270px;
    }
`;

export const CarouselCompont = styled(Carousel)`
    text-align: center;
    height: 270px;
    line-height: 160px;
    background: url(${img});
    background-size:625px 270px;
    overflow: hidden;
`

export const HomeRight = styled.div `
    margin: 30px;
    width: 240px;
    float: right;
`;