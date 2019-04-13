import React, { Component } from "react";
import Header from '../../components/Header/index';
import { Link } from "react-router-dom";
import { List,Icon,Tabs } from 'antd';
import { H3 } from './style';
import { connect } from 'react-redux';

const TabPane = Tabs.TabPane;

@connect(
    state=>({
        // userID: state.user._id
        detailfindlist: state.detail.detailfindlist,
        charpterfindlist: state.charpter.findlist,
        partfindlist: state.part.findlist,
    }),
)
class Find extends Component {
    render() {
        const { detailfindlist,charpterfindlist,partfindlist } = this.props
        // console.log('话题结果',detailfindlist)
        // console.log('charpter结果',charpterfindlist)
        // console.log('章节结果',partfindlist)
        // console.log(this.props.location.find)
        const IconText = ({ type, text }) => (
            <span>
                <Icon
                    type={type}
                    style={{ marginRight: 8 }}
                />
                {text}
            </span>
        );
        return (
            <div>
                <Header find={this.props.location.find}/>
                <Tabs>
                    <TabPane tab={<span><Icon type="book"/>章节</span>} key="1">
                        {partfindlist&&partfindlist.length!==0?
                            <List
                                itemLayout="horizontal"
                                pagination={{
                                    onChange: (page) => {
                                        console.log(page);
                                    },
                                    pageSize: 10,
                                }}
                                dataSource={partfindlist}
                                renderItem={item => (
                                    <List.Item
                                        key={item.name}
                                        actions={[<IconText type="heart-o" text={item.collectnum} />,<IconText type="like-o" text={item.likenum} />]}
                                    >
                                        <List.Item.Meta style={{marginLeft:100}}
                                            title={<Link to={{
                                                        pathname: "/parts/"+item.partid+"/charpters",
                                                    }}>{item.name}</Link>}
                                        />
                                    </List.Item>
                                )}
                            />
                            :<div style={{textAlign:"center",marginTop: 150}}>
                                <img alt='未找到相关内容' src="https://cdn2.jianshu.io/assets/web/icon_default-91af5c0baead9a94bf1429cefb4ca554.png" style={{width: 100}}/>
                                <H3>未找到相关内容</H3>
                            </div>}
                    </TabPane>
                    <TabPane tab={<span><Icon type="file"/>Charpter</span>} key="2">
                        {charpterfindlist&&charpterfindlist.length!==0?
                                <List
                                    itemLayout="horizontal"
                                    pagination={{
                                        onChange: (page) => {
                                            console.log(page);
                                        },
                                        pageSize: 10,
                                    }}
                                    dataSource={charpterfindlist}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.name}
                                            actions={[<IconText type="heart-o" text={item.collectnum} />,<IconText type="like-o" text={item.likenum} />]}
                                        >
                                            <List.Item.Meta style={{marginLeft:100}}
                                                title={<Link to={{
                                                            pathname: "/parts/"+item.partid+"/charpters/"+item.charpterid+"/details",
                                                        }}>{item.name}</Link>}
                                            />
                                        </List.Item>
                                    )}
                                />
                                :<div style={{textAlign:"center",marginTop: 150}}>
                                    <img alt='未找到相关内容' src="https://cdn2.jianshu.io/assets/web/icon_default-91af5c0baead9a94bf1429cefb4ca554.png" style={{width: 100}}/>
                                    <H3>未找到相关内容</H3>
                                </div>}
                    </TabPane>
                    <TabPane tab={<span><Icon type="bars"/>话题</span>} key="3">
                        {detailfindlist&&detailfindlist.length!==0?
                            <List
                                itemLayout="horizontal"
                                pagination={{
                                    onChange: (page) => {
                                        console.log(page);
                                    },
                                    pageSize: 10,
                                }}
                                dataSource={detailfindlist}
                                renderItem={item => (
                                    <List.Item
                                        key={item.name}
                                        actions={[<IconText type="heart-o" text={item.collectnum} />,<IconText type="like-o" text={item.num} />]}
                                    >
                                        <List.Item.Meta style={{marginLeft:100}}
                                            title={<Link to={{
                                                        pathname: "/parts/"+item.charpterID.partID.partid+"/charpters/"+item.charpterID.charpterid+"/details/"+item.detailid+'/contents',
                                                    }}>{item.name}</Link>}
                                        />
                                    </List.Item>
                                )}
                            />
                            :<div style={{textAlign:"center",marginTop: 150}}>
                                <img alt='未找到相关内容' src="https://cdn2.jianshu.io/assets/web/icon_default-91af5c0baead9a94bf1429cefb4ca554.png" style={{width: 100}}/>
                                <H3>未找到相关内容</H3>
                            </div>}
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Find;