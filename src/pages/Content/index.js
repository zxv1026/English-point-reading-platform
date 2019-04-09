import React, { Component } from "react";
import Header from '../../components/Header/index';
import ListContent from './components/listcontent';
import { Link } from "react-router-dom";
import { Icon, Tooltip } from "antd";
import { connect } from 'react-redux';
import { getContentListOne,changeScrollTopShow } from "../../redux/content_redux";
import { getDetailOne,updatenum } from "../../redux/detail_redux";
import { create,remove,getone } from "../../redux/likerecord_redux";
import { createCollection,removeCollection,getCollectionOne } from "../../redux/collectrecord_redux";
import { updatecharpterlikenum } from "../../redux/charpter_redux";
import { updatepartlikenum } from "../../redux/part_redux";
import moment from 'moment';
import './index.less';

@connect(
    state => ({
        userID: state.user._id,
        showScroll: state.content.showScroll,
        contentlist: state.content.contentlist,
        detailID: state.detail._id,
        num: state.detail.num,
        detailcollectnum: state.detail.collectnum,
        detailname: state.detail.name,
        mp3: state.detail.mp3,
        data: state.detail.charpterID,
        like: state.likerecord.like,
        likeID: state.likerecord._id,
        collect: state.collectrecord.collect,
        collectID: state.collectrecord._id,
    }),
    {getContentListOne,changeScrollTopShow,getDetailOne,create,remove,getone,updatenum,updatecharpterlikenum,updatepartlikenum,createCollection,removeCollection,getCollectionOne}
)
class Content extends Component {
    componentDidMount() {
        let state={id:0};
        state.id = this.props.match.params.detailId
        this.props.getDetailOne(state)
        this.props.getContentListOne(state)
        this.bindEvents();
    }
    componentDidUpdate(){
        const { userID,detailID } = this.props;
        let detaildata = {
            userID: userID,
            detailID: detailID,
        };
        this.props.getone(detaildata)
        this.props.getCollectionOne(detaildata)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow);
    }
    handleScrollTop(){
        window.scrollTo(0, 0);
    }
    bindEvents() {
        console.log('bindevents')
        window.addEventListener('scroll', this.props.changeScrollTopShow);
    }
    //点赞
    like(like, userID, detailID, likeID, num, charpterlikenum,partlikenum) {
        if(like){
            this.props.remove(likeID)
            num = num - 1;
            console.log("-1前" + charpterlikenum)
            charpterlikenum = charpterlikenum - 1;
            console.log("-1后" + charpterlikenum)
            partlikenum = partlikenum - 1;
            const detail = {
                num: num
            }
            const charpter = {
                likenum: charpterlikenum
            }
            const part = {
                likenum: partlikenum
            }
            this.props.updatenum(detailID, detail);
            console.log('点赞更新')
            console.log(this.props.match.params.charpterId)
            console.log(charpter)
            this.props.updatecharpterlikenum(this.props.match.params.charpterId, charpter);
            this.props.updatepartlikenum(this.props.match.params.partId, part);
            let state={id:0};
            state.id = this.props.match.params.detailId
            this.props.getDetailOne(state)
        }else{
            let likedata={
                userID: userID,
                detailID: detailID,
                like: 'liked',
                created: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            };
            this.props.create(likedata)
            num = num + 1;
            console.log("+1前" + charpterlikenum)
            charpterlikenum = charpterlikenum + 1;
            console.log("+1后"+charpterlikenum)
            partlikenum = partlikenum + 1;
            const detail={
                num: num
            }
            const charpter = {
                likenum: charpterlikenum
            }
            const part = {
                likenum: partlikenum
            }
            this.props.updatenum(detailID,detail)
            console.log('点赞更新')
            console.log(this.props.match.params.charpterId)
            console.log(charpter)
            this.props.updatecharpterlikenum(this.props.match.params.charpterId, charpter);
            this.props.updatepartlikenum(this.props.match.params.partId, part);
            let state={id:0};
            state.id = this.props.match.params.detailId
            this.props.getDetailOne(state)
        }
    }

    //收藏
    collect(collect, userID, detailID, collectID, detailcollectnum,charptercollectnum,partcollectnum) {
        if (collect) {
            this.props.removeCollection(collectID)
            detailcollectnum = detailcollectnum - 1;
            charptercollectnum = charptercollectnum - 1;
            partcollectnum = partcollectnum - 1;
            const detail = {
                collectnum: detailcollectnum
            }
            const charpter = {
                collectnum: charptercollectnum
            }
            const part = {
                collectnum: partcollectnum
            }
            this.props.updatenum(detailID, detail);
            this.props.updatecharpterlikenum(this.props.match.params.charpterId, charpter);
            this.props.updatepartlikenum(this.props.match.params.partId, part);
            let state={id:0};
            state.id = this.props.match.params.detailId
            this.props.getDetailOne(state)
        } else {
            let collectdata = {
                userID: userID,
                detailID: detailID,
                collect: 'collected',
                created: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            };
            this.props.createCollection(collectdata)
            detailcollectnum = detailcollectnum + 1;
            charptercollectnum = charptercollectnum + 1;
            partcollectnum = partcollectnum + 1;
            const detail = {
                collectnum: detailcollectnum
            }
            const charpter = {
                collectnum: charptercollectnum
            }
            const part = {
                collectnum: partcollectnum
            }
            this.props.updatenum(detailID, detail)
            this.props.updatecharpterlikenum(this.props.match.params.charpterId, charpter);
            this.props.updatepartlikenum(this.props.match.params.partId, part);
            let state={id:0};
            state.id = this.props.match.params.detailId
            this.props.getDetailOne(state)
        }
    }

    render() {
        const { contentlist,mp3,detailname,num,detailID,userID,like,likeID,collect,collectID,detailcollectnum,data} = this.props
       
        return (
            <div>
                <Header path={this.props.location.pathname}/>
                <Link className="close-content" to={{
                    pathname: '/parts/'+this.props.match.params.partId+'/charpters/'+this.props.match.params.charpterId+'/details'
                }}>
                    <Icon type="caret-left"/>Back
                </Link>
                <div>
                    <h2>{detailname}</h2>
                    {userID?<span>
                                <span style={{ marginRight: 8 }}>
                                    <Tooltip title="点赞">
                                        <Icon
                                            type="like-o" 
                                            theme={like === 'liked' ? 'twoTone' : 'outlined'}
                                            twoToneColor = "#eb2f96"
                                            onClick={() =>this.like(like, userID, detailID, likeID,num,data.likenum,data.partID.likenum)}
                                        />
                                    </Tooltip>
                                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                                        {num}
                                    </span>
                                </span>
                                <span>
                                    <Tooltip title="收藏">
                                        <Icon
                                            type="heart-o" 
                                            theme={collect === 'collected' ? 'twoTone' : 'outlined'}
                                            twoToneColor = "#eb2f96"
                                            onClick={() =>this.collect(collect, userID, detailID, collectID,detailcollectnum,data.collectnum,data.partID.collectnum)}
                                        />
                                    </Tooltip>
                                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                                        {detailcollectnum}
                                    </span>
                                </span>
                            </span>:<span>
                                        <span>
                                            <Tooltip title="点赞">
                                                <Link
                                                    to={{
                                                        pathname: '/login',
                                                        link: this.props.location.pathname
                                                    }}
                                                    className='link' >
                                                    <Icon
                                                        type="like" 
                                                        theme='outlined'
                                                    />
                                                </Link>
                                            </Tooltip>
                                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                                                {num}
                                            </span>
                                        </span>
                                        <span>
                                            <Tooltip title="收藏">
                                                <Link 
                                                    to={{
                                                        pathname: '/login',
                                                        link: this.props.location.pathname
                                                    }}
                                                    className='link' >
                                                    <Icon
                                                        type="heart-o" 
                                                        theme='outlined'
                                                    />
                                                </Link>
                                            </Tooltip>
                                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                                                {num}
                                            </span>
                                        </span>
                                    </span>}
                </div>
                <ListContent
                    list={contentlist}
                    mp3={mp3}
                />
                { this.props.showScroll 
                    ? <div className='showScroll' onClick={this.handleScrollTop}>
                            <Tooltip placement="left" title="回到顶部">
                                <Icon type='up'/>
                            </Tooltip>
                      </div> : null}
            </div>
        )
    }
} 

export default Content;