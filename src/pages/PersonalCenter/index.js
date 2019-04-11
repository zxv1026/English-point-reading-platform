import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Tabs,Icon,Row,Col,Button,List,Tooltip } from 'antd';
import Header from '../../components/Header';
import Information from './components/information';
import { connect } from 'react-redux';
import { getCollectionList,removeCollection } from '../../redux/collectrecord_redux';
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
        list: state.collectrecord.list
    }),
    {getCollectionList,removeCollection,updatenum,updatecharpterlikenum,updatepartlikenum}
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
        this.props.getCollectionList(data)
        console.log(this.props.list)
    }
    cancelCollect(userID,detailID, collectID, detailcollectnum, charptercollectnum, partcollectnum) {
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
        this.props.removeCollection(collectID,userID)
    }
    render() {
        const { username,list } = this.props
        const IconText = ({ type, text, theme, title }) => (
            <span>
                <Tooltip title={title}>
                    <Icon
                        type={type}
                        style={{ marginRight: 8 }}
                        theme={theme === 'collected' ? 'twoTone' : 'outlined'}
                        twoToneColor = "#eb2f96"
                    />
                    <span style={{ marginRight: 20 }}>{text}</span>
                </Tooltip>
            </span>
        );
        console.log(this.props)
        console.log(this.props.list)
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
                                dataSource={list}
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
                                            <Button onClick={()=>this.cancelCollect(item.userID,item.detailID._id, item._id, item.detailID.collectnum, item.detailID.charpterID.collectnum, item.detailID.charpterID.partID.collectnum)}>取消收藏</Button>
                                        </Tooltip>
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab={<span><Icon type="like" />点赞的话题</span>} key="3">
                            <div>
                                TODO
                            </div>
                        </TabPane>
                    </Tabs>
                </div>:<Redirect to='/'/>}
            </div>
        );
    }
}

export default PersonalCenter;
