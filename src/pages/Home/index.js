import React, { Component } from "react";
import Header from '../../components/Header/index';
import ListPart from './components/listpart/index';
import { Link } from "react-router-dom";
import { Icon,Tooltip,Tabs } from 'antd';
import { HomeWrapper,HomeLeft,HomeRight,CarouselCompont,SlideShow } from "./style";
import { connect } from 'react-redux';
import { getPartList,changePartScrollTopShow,getPartLikeList,getPartCollectList } from "../../redux/part_redux";
import { getCharpterLikeList,getCharpterCollectList } from "../../redux/charpter_redux";
import { getDetailNewestList,getDetailLikeList,getDetailCollectList } from '../../redux/detail_redux'

const TabPane = Tabs.TabPane;

@connect(
    state => ({
        partlist: state.part.partlist,
        partlikelist: state.part.likelist,
        partcollectlist: state.part.collectlist,
        showScroll: state.part.showScroll,
        charpterlikelist: state.charpter.likelist,
        charptercollectlist: state.charpter.collectlist,
        detailnewlist: state.detail.newlist,
        detaillikelist: state.detail.likelist,
        detailcollectlist: state.detail.collectlist,
    }),
    {getPartList,changePartScrollTopShow,getDetailNewestList,getDetailLikeList,getDetailCollectList,getCharpterLikeList,getCharpterCollectList,getPartLikeList,getPartCollectList}
)
class Home extends Component {
    componentDidMount() {
        this.props.getPartList();
        this.props.getPartLikeList();
        this.props.getPartCollectList();
        this.props.getDetailNewestList();
        this.props.getDetailLikeList();
        this.props.getDetailCollectList();
        this.props.getCharpterLikeList();
        this.props.getCharpterCollectList();
        this.bindEvents();
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changePartScrollTopShow);
    }
    handleScrollTop() {
        window.scrollTo(0, 0);
    }
    bindEvents() {
        console.log('bindevents')
        window.addEventListener('scroll', this.props.changePartScrollTopShow);
    }

    handlePrev = () => {
        this.refs.img.prev(); //ref = img
    }
    handleNext = () => {
        this.refs.img.next();
    }
    render() {
        const { partlist,detailnewlist,detaillikelist,detailcollectlist,charpterlikelist,charptercollectlist,partlikelist,partcollectlist } = this.props
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
                            <Tabs>
                                <TabPane tab={<span><Icon type="book"/>章节</span>} key="1">
                                    {partlikelist.map((part)=>(
                                        <div>
                                            <Link to={{
                                                pathname: "/parts/"+part.partid+"/charpters",
                                            }}><span>{part.name}</span></Link>
                                            <div style={{ float: "right" }}>
                                                <Tooltip title='点赞数'>
                                                    <Icon type='like-o' style={{ marginRight: 8 }}/>
                                                    {part.likenum}
                                                </Tooltip>
                                            </div>
                                        </div>
                                    ))}
                                </TabPane>
                                <TabPane tab={<span><Icon type="file"/>Charpter</span>} key="2">
                                    {charpterlikelist.map((charpter)=>(
                                        <div>
                                            <Link to={{
                                                pathname: "/parts/"+charpter.partID.partid+"/charpters/"+charpter.charpterid,
                                            }}><span>{charpter.name}</span></Link>
                                            <div style={{ float: "right" }}>
                                                <Tooltip title='点赞数'>
                                                    <Icon type='like-o' style={{ marginRight: 8 }}/>
                                                    {charpter.likenum}
                                                </Tooltip>
                                            </div>
                                        </div>
                                    ))}
                                </TabPane>
                                <TabPane tab={<span><Icon type="bars"/>话题</span>} key="3">
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
                                </TabPane>
                            </Tabs>
                        </div>
                        <div style={{marginBottom:20}}>
                            <h3>收藏排行推荐</h3>
                            <Tabs>
                                <TabPane tab={<span><Icon type="book"/>章节</span>} key="1">
                                    {partcollectlist.map((part)=>(
                                        <div>
                                            <Link to={{
                                                pathname: "/parts/"+part.partid+"/charpters",
                                            }}><span>{part.name}</span></Link>
                                            <div style={{ float: "right" }}>
                                                <Tooltip title='点赞数'>
                                                    <Icon type='heart-o' style={{ marginRight: 8 }}/>
                                                    {part.collectnum}
                                                </Tooltip>
                                            </div>
                                        </div>
                                    ))}
                                </TabPane>
                                <TabPane tab={<span><Icon type="file"/>Charpter</span>} key="2">
                                    {charptercollectlist.map((charpter)=>(
                                        <div>
                                            <Link to={{
                                                pathname: "/parts/"+charpter.partID.partid+"/charpters/"+charpter.charpterid,
                                            }}><span>{charpter.name}</span></Link>
                                            <div style={{ float: "right" }}>
                                                <Tooltip title='点赞数'>
                                                    <Icon type='heart-o' style={{ marginRight: 8 }}/>
                                                    {charpter.collectnum}
                                                </Tooltip>
                                            </div>
                                        </div>
                                    ))}
                                </TabPane>
                                <TabPane tab={<span><Icon type="bars"/>话题</span>} key="3">
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
                                </TabPane>
                            </Tabs>
                        </div>
                    </HomeRight>
                    { this.props.showScroll 
                        ? <div className='showScroll bottom' onClick={this.handleScrollTop}>
                                <Tooltip placement="left" title="回到顶部">
                                    <Icon type='up'/>
                                </Tooltip>
                        </div> : null}
                </HomeWrapper>
            </div>
        )
    }
}

export default Home;