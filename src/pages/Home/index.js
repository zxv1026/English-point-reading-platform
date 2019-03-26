import React, { Component } from "react";
import Header from '../../components/Header/index';
import ListPart from './components/listpart/index';
import img1 from '../../assets/images/ch01.jpg';
import img2 from '../../assets/images/ch03.jpg';
import img3 from '../../assets/images/ch05.jpg';
import img4 from '../../assets/images/ch40.jpg';
import { Carousel } from 'antd';
import { HomeWrapper,HomeLeft,HomeRight } from "./style";


class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <HomeWrapper>
                    <HomeLeft>
                        <Carousel autoplay dots>
                            <div><h3><img className="banner-img" alt='' src={img1}/></h3></div>
                            <div><h3><img className="banner-img" alt='' src={img2}/></h3></div>
                            <div><h3><img className="banner-img" alt='' src={img3}/></h3></div>
                            <div><h3><img className="banner-img" alt='' src={img4}/></h3></div>
                        </Carousel>
                        <ListPart/>
                    </HomeLeft>
                    <HomeRight>right</HomeRight>
                </HomeWrapper>
            </div>
        )
    }
}

export default Home;