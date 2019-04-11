import React, { Component } from "react";
import Header from '../../components/Header/index';
import ListPart from './components/listpart/index';
import { Link } from "react-router-dom";
import { Icon,Tooltip } from 'antd';
import { HomeWrapper,HomeLeft,HomeRight,CarouselCompont,SlideShow } from "./style";
import { connect } from 'react-redux';
import { getPartList } from "../../redux/part_redux";
import { getDetailNewestList,getDetailLikeList,getDetailCollectList } from '../../redux/detail_redux'

@connect(
    state => ({
        partlist: state.part.partlist,
        detailnewlist: state.detail.newlist,
        detaillikelist: state.detail.likelist,
        detailcollectlist: state.detail.collectlist,
    }),
    {getPartList,getDetailNewestList,getDetailLikeList,getDetailCollectList}
)
class Home extends Component {
    componentDidMount() {
        this.props.getPartList();
        this.props.getDetailNewestList();
        this.props.getDetailLikeList();
        this.props.getDetailCollectList();
    }
    handlePrev = () => {
        this.refs.img.prev(); //ref = img
    }
    handleNext = () => {
        this.refs.img.next();
    }
    render() {
        const { partlist,detailnewlist,detaillikelist,detailcollectlist } = this.props
        console.log(detailnewlist)
        console.log('like',detaillikelist)
        console.log('collect',detailcollectlist)
        return (
            <div>
                <Header path={this.props.location.pathname}/>
                <HomeWrapper>
                    <HomeLeft>
                        <SlideShow>
                            <Icon type="left" theme="outlined" style={{ fontSize: '30px'}} onClick={this.handlePrev}/>
                            <CarouselCompont autoplay ref='img'>
                                {detailnewlist.map((detail,i=0)=>(
                                    <div className='wrapper'>
                                        <img src={require(`../../assets/images/ch0${i+1}.jpg`)} alt=''/>
                                        <div className='wrapper1'>
                                            <Link to={{
                                                pathname: "/parts/"+detail.charpterID.partid+"/charpters/"+detail.charpterid+"/details/"+detail.detailid+'/contents',
                                            }}><p>{detail.name}</p></Link>
                                        </div>
                                    </div>
                                ))}
                            </CarouselCompont>
                            <Icon type="right" theme="outlined"  style={{ fontSize: '30px'}} onClick={this.handleNext}/>
                        </SlideShow>
                        <ListPart
                            list={partlist}
                        />
                    </HomeLeft>
                    <HomeRight>
                        <div style={{marginBottom:20}}>
                            <h3>点赞排行推荐</h3>
                            {detaillikelist.map((detail)=>(
                                <div>
                                    <Link to={{
                                        pathname: "/parts/"+detail.charpterID.partid+"/charpters/"+detail.charpterid+"/details/"+detail.detailid+'/contents',
                                    }}><span>{detail.name}</span></Link>
                                    <div style={{ float: "right" }}>
                                        <Tooltip title='点赞数'>
                                            <Icon type='like-o' style={{ marginRight: 8 }}/>
                                            {detail.num}
                                        </Tooltip>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{marginBottom:20}}>
                            <h3>收藏排行推荐</h3>
                            {detailcollectlist.map((detail)=>(
                                <div>
                                    <Link to={{
                                        pathname: "/parts/"+detail.charpterID.partid+"/charpters/"+detail.charpterid+"/details/"+detail.detailid+'/contents',
                                    }}><span>{detail.name}</span></Link>
                                    <div style={{ float: "right" }}>
                                        <Tooltip title='收藏数'>
                                            <Icon type='heart-o' style={{ marginRight: 8 }}/>
                                            {detail.collectnum}
                                        </Tooltip>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </HomeRight>
                </HomeWrapper>
            </div>
        )
    }
}

export default Home;