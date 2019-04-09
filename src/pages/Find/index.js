import React, { Component } from "react";
import Header from '../../components/Header/index';
import { Link } from "react-router-dom";
import { List,Icon } from 'antd';
import { H3 } from './style';
import { connect } from 'react-redux';

@connect(
    state=>({
        // userID: state.user._id
        detailfindlist: state.detail.detailfindlist
    }),
)
class Find extends Component {
    render() {
        const { detailfindlist } = this.props
        console.log(detailfindlist)
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
                <Header/>
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
            </div>
        )
    }
}

export default Find;