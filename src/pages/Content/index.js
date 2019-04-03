import React, { Component } from "react";
import Header from '../../components/Header/index';
import ListContent from './components/listcontent';
import { Link } from "react-router-dom";
import { Icon, Tooltip } from "antd";
import { connect } from 'react-redux';
import { getContentListOne } from "../../redux/content_redux";
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
        contentlist: state.content.contentlist,
        detailID: state.detail._id,
        num: state.detail.num,
        detailcollectnum: state.detail.collectnum,
        detailname: state.detail.name,
        mp3: state.detail.mp3,
        charpterlikenum: state.charpter.likenum,
        charptercollectnum: state.charpter.collectnum,
        partlikenum: state.part.likenum,
        partcollectnum: state.part.collectnum,
        like: state.likerecord.like,
        likeID: state.likerecord._id,
        collect: state.collectrecord.collect,
        collectID: state.collectrecord._id,
    }),
    {getContentListOne,getDetailOne,create,remove,getone,updatenum,updatecharpterlikenum,updatepartlikenum,createCollection,removeCollection,getCollectionOne}
)
class Content extends Component {
    componentDidMount() {
        let state={id:0};
        state.id = this.props.match.params.detailId
        this.props.getDetailOne(state)
        this.props.getContentListOne(state)
        console.log(this.props.userID)
        console.log(this.props.detailID)
    }
    //点赞
    like(like, userID, detailID, likeID, num, charpterlikenum, partlikenum) {
        if(like){
            this.props.remove(likeID)
            num = num - 1;
            charpterlikenum = charpterlikenum - 1;
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
            this.props.updatecharpterlikenum(this.props.match.params.charpterId, charpter);
            this.props.updatepartlikenum(this.props.match.params.partId, part);
        }else{
            let data={
                userID: userID,
                detailID: detailID,
                like: 'liked',
                created: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            };
            this.props.create(data)
            num = num + 1;
            charpterlikenum = charpterlikenum + 1;
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
            this.props.updatecharpterlikenum(this.props.match.params.charpterId, charpter);
            this.props.updatepartlikenum(this.props.match.params.partId, part);
        }
    }

    //收藏
    collect(collect, userID, detailID, collectID, detailcollectnum, charptercollectnum, partcollectnum) {
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
        } else {
            let data = {
                userID: userID,
                detailID: detailID,
                collect: 'collected',
                created: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            };
            this.props.createCollection(data)
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
        }
    }

    render() {
        const { contentlist,mp3,detailname,num,detailID,userID,like,likeID,charpterlikenum,partlikenum,collect,collectID,detailcollectnum,charptercollectnum,partcollectnum} = this.props
        console.log(this.props)
        console.log(mp3)
        console.log(detailID)
        console.log(userID)
        let data = {
            userID: userID,
            detailID: detailID,
        };
        this.props.getone(data)
        this.props.getCollectionOne(data)
        console.log(like)
        console.log(this.props.location.pathname)
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
                                <span>
                                    <Tooltip title="点赞">
                                        <Icon
                                            type="like-o" 
                                            theme={like === 'liked' ? 'twoTone' : 'outlined'}
                                            twoToneColor = "#eb2f96"
                                            onClick={() =>this.like(like, userID, detailID, likeID,num,charpterlikenum,partlikenum)}
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
                                            onClick={() =>this.collect(collect, userID, detailID, collectID,detailcollectnum,charptercollectnum,partcollectnum)}
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
                    partid={this.props.match.params.partId}
                    charpterid={this.props.match.params.charpterId}
                    mp3={mp3}
                />
            </div>
        )
    }
}

export default Content;