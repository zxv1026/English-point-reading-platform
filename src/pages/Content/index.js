import React, { Component } from "react";
import Header from '../../components/Header/index';
import ListContent from './components/listcontent';
import { Link } from "react-router-dom";
import { Icon, Tooltip } from "antd";
import { connect } from 'react-redux';
import { getContentListOne } from "../../redux/content_redux";
import { getDetailOne,updatenum } from "../../redux/detail_redux";
import { create,remove,getone } from "../../redux/likerecord_redux";
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
        detailname: state.detail.name,
        mp3: state.detail.mp3,
        charpterlikenum: state.charpter.likenum,
        partlikenum: state.part.likenum,
        like: state.likerecord.like,
        likeID: state.likerecord._id
    }),
    {getContentListOne,getDetailOne,create,remove,getone,updatenum,updatecharpterlikenum,updatepartlikenum}
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
    like(like, userID, detailID, likeID,num,charpterlikenum,partlikenum) {
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

    render() {
        const { contentlist,mp3,detailname,num,detailID,userID,like,likeID,charpterlikenum,partlikenum} = this.props
        console.log(this.props)
        console.log(mp3)
        console.log(detailID)
        console.log(userID)
        let data = {
            userID: userID,
            detailID: detailID,
        };
        this.props.getone(data)
        console.log(like)
        return (
            <div>
                <Header/>
                <Link className="close-content" to={{
                    pathname: '/parts/'+this.props.match.params.partId+'/charpters/'+this.props.match.params.charpterId+'/details'
                }}>
                    <Icon type="caret-left"/>Back
                </Link>
                <div>
                    <h2>{detailname}</h2>
                    {userID? <span>
                                <Tooltip title="Like">
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
                            </span>:<span>
                                        <Tooltip title="Like">
                                            <Link to='/login' className='link' >
                                                <Icon
                                                    type="like" 
                                                    theme='outlined'
                                                />
                                            </Link>
                                        </Tooltip>
                                        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                                            {num}
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