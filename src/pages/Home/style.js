import styled from 'styled-components';
import { Carousel } from 'antd';

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

export const SlideShow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
`

export const CarouselCompont = styled(Carousel)`
    text-align: center;
    width: 565px;
    height: 270px;
    line-height: 160px;
    overflow: hidden;
    .wrapper{
      width: 400px;
      height: 300px;
      margin: 0 auto;
      position: relative;
      img{
          width:100%;
          height:100%;
          margin-left:0;
      }
      .wrapper1{
        position: absolute;
        top: 20%;
        left: 45%;
        p{
          text-align: center;
          color: #fff;
          font-size: 20px;
        }
      }
    }
`

export const HomeRight = styled.div `
    margin: 30px;
    width: 240px;
    float: right;
`;