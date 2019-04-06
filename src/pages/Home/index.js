import React, { Component } from "react";
import Header from '../../components/Header/index';
import ListPart from './components/listpart/index';
import { Link } from "react-router-dom";
import { Icon, List,Tooltip } from 'antd';
import { HomeWrapper,HomeLeft,HomeRight,CarouselCompont } from "./style";
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
                        <CarouselCompont autoplay >
                            {detailnewlist.map((detail)=>(
                                <div >
                                    <Link to={{
                                        pathname: "/parts/"+detail.charpterID.partid+"/charpters/"+detail.charpterid+"/details/"+detail.detailid+'/contents',
                                    }}><h3>{detail.name}</h3></Link>
                                </div>
                            ))}
                        </CarouselCompont>
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