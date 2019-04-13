import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Tabs,Icon,Row,Col,Button,List,Tooltip } from 'antd';
import Header from '../../components/Header';
import Information from './components/information';
import { connect } from 'react-redux';
import { getCollectionList,removeCollection } from '../../redux/collectrecord_redux';
import { getLikeList,remove } from '../../redux/likerecord_redux';
import { updatenum } from "../../redux/detail_redux";
import { updatecharpterlikenum } from "../../redux/charpter_redux";
import { updatepartlikenum } from "../../redux/part_redux";
import moment from 'moment';

const TabPane = Tabs.TabPane;

@connect(
    state => ({
        userID: state.user._id,
        username: state.user.username,
        avatar: state.user.avatar,
        collectlist: state.collectrecord.list,
        likelist: state.likerecord.list,
    }),
    {getCollectionList,removeCollection,updatenum,updatecharpterlikenum,updatepartlikenum,getLikeList,remove}
)
class PersonalCenter extends Component {
    
    constructor(props){
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
        const { userID } = this.props
        console.log(userID)
        const data = {
            userID: userID
        }
        this.props.getCollectionList(data);
        this.props.getLikeList(data);
    }
    cancelCollect(userID,detailID, collectID, detailcollectnum, charptercollectnum, partcollectnum,charpterId,partId) {
        this.props.removeCollection(collectID,userID);
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
        this.props.updatecharpterlikenum(charpterId, charpter);
        this.props.updatepartlikenum(partId, part);
    }
    cancelLike(userID,detailID, likeID, detaillikenum, charpterlikenum, partlikenum,charpterId,partId){
        this.props.remove(likeID, userID);
        detaillikenum = detaillikenum - 1;
        console.log("-1前" + charpterlikenum);
        charpterlikenum = charpterlikenum - 1;
        console.log("-1后" + charpterlikenum);
        partlikenum = partlikenum - 1;
        const detail = {
            num: detaillikenum
        }
        const charpter = {
            likenum: charpterlikenum
        }
        const part = {
            likenum: partlikenum
        }
        console.log(charpter)
        this.props.updatenum(detailID, detail);
        this.props.updatecharpterlikenum(charpterId, charpter);
        this.props.updatepartlikenum(partId, part);
    }
    render() {
        const { username,collectlist,likelist } = this.props
        const IconText = ({ type, text, theme, title }) => (
            <span>
                <Tooltip title={title}>
                    <Icon
                        type={type}
                        theme={ theme ? 'filled' : 'outlined' }
                        style={ theme ? { color: "#ea6f5a",marginRight: 8 }: { marginRight: 8 }}
                    />
                    <span style={{ marginRight: 20 }}>{text}</span>
                </Tooltip>
            </span>
        );
        console.log(this.props)
        return (
            <div>
                {username?
                <div>
                    <Header/>
                    <Tabs>
                        <TabPane tab={<span><Icon type="user" />基本信息</span>} key="1">
                            <Information/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="heart" />收藏的话题</span>} key="2">
                            <List
                                itemLayout="horizontal"
                                pagination={{
                                    onChange: (page) => {
                                        console.log(page);
                                    },
                                    pageSize: 10,
                                }}
                                dataSource={collectlist}
                                renderItem={item => (
                                    <List.Item
                                        key={item.detailID.detailname}
                                        actions={[<IconText type="heart-o" text={item.detailID.collectnum} theme={item.collect} title='收藏数'/>]}
                                    >
                                        <List.Item.Meta style={{marginLeft:20}}
                                            title={<Link to={{
                                                        pathname: "/parts/"+item.detailID.charpterID.partID.partid+"/charpters",
                                                    }}>{item.detailID.charpterID.partID.name}</Link>}
                                        />
                                        <List.Item.Meta
                                            title={<Link to={{
                                                        pathname: "/parts/"+item.detailID.charpterID.partID.partid+"/charpters/"+item.detailID.charpterID.charpterid+"/details",
                                                    }}>{item.detailID.charpterID.name}</Link>}
                                        />
                                        <List.Item.Meta
                                            title={<Link to={{
                                                        pathname: "/parts/"+item.detailID.charpterID.partID.partid+"/charpters/"+item.detailID.charpterID.charpterid+"/details/"+item.detailID.detailid+'/contents',
                                                    }}>{item.detailID.name}</Link>}
                                        />
                                        <div>
                                            <span>收藏时间:</span>
                                            <span style={{marginRight:100}}>{moment(item.created).format('YYYY-MM-DD HH:mm:ss')}</span>
                                        </div>
                                        <Tooltip title="取消收藏">
                                            <Button onClick={()=>this.cancelCollect(item.userID,item.detailID._id, item._id, item.detailID.collectnum, item.detailID.charpterID.collectnum, item.detailID.charpterID.partID.collectnum,item.detailID.charpterID.charpterid,item.detailID.charpterID.partID.partid)}>取消收藏</Button>
                                        </Tooltip>
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab={<span><Icon type="like" />点赞的话题</span>} key="3">
                            <List
                                itemLayout="horizontal"
                                pagination={{
                                    onChange: (page) => {
                                        console.log(page);
                                    },
                                    pageSize: 10,
                                }}
                                dataSource={likelist}
                                renderItem={item => (
                                    <List.Item
                                        key={item.detailID.detailname}
                                        actions={[<IconText type="like-o" text={item.detailID.num} theme={item.like} title='点赞数'/>]}
                                    >
                                        <List.Item.Meta style={{marginLeft:20}}
                                            title={<Link to={{
                                                        pathname: "/parts/"+item.detailID.charpterID.partID.partid+"/charpters",
                                                    }}>{item.detailID.charpterID.partID.name}</Link>}
                                        />
                                        <List.Item.Meta
                                            title={<Link to={{
                                                        pathname: "/parts/"+item.detailID.charpterID.partID.partid+"/charpters/"+item.detailID.charpterID.charpterid+"/details",
                                                    }}>{item.detailID.charpterID.name}</Link>}
                                        />
                                        <List.Item.Meta
                                            title={<Link to={{
                                                        pathname: "/parts/"+item.detailID.charpterID.partID.partid+"/charpters/"+item.detailID.charpterID.charpterid+"/details/"+item.detailID.detailid+'/contents',
                                                    }}>{item.detailID.name}</Link>}
                                        />
                                        <div>
                                            <span>点赞时间:</span>
                                            <span style={{marginRight:100}}>{moment(item.created).format('YYYY-MM-DD HH:mm:ss')}</span>
                                        </div>
                                        <Tooltip title="取消点赞">
                                            <Button onClick={()=>this.cancelLike(item.userID,item.detailID._id, item._id, item.detailID.num, item.detailID.charpterID.likenum, item.detailID.charpterID.partID.likenum,item.detailID.charpterID.charpterid,item.detailID.charpterID.partID.partid)}>取消点赞</Button>
                                        </Tooltip>
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                    </Tabs>
                </div>:<Redirect to='/'/>}
            </div>
        );
    }
}

export default PersonalCenter;
