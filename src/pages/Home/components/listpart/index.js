import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Icon, List,Tooltip } from 'antd';

class Listpart extends Component {
    
    render() {
        const { list } =this.props;
        const IconText = ({ type, text ,title}) => (
            <span>
                <Tooltip title={title}>
                    <Icon type={type} style={{ marginRight: 8 }} />
                    {text}
                </Tooltip>
            </span>
        );
        return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={list}
                    renderItem={item => (
                        <List.Item
                            key={"part_"+item.partid}
                            actions={[
                                <IconText type="heart-o" text={item.collectnum} title="收藏数"/>, 
                                <IconText type="like-o" text={item.likenum} title="点赞数" />, 
                                <IconText type="message" text={item.commentnum} title="评论数"/>]}
                            extra={<img height={200} width={272} alt="partlogo" src={item.partid<9?require(`../../../../assets/images/part/part${item.partid}.jpg`):require(`../../../../assets/images/def.png`)}/>}
                        >
                            <Link to={{
                                pathname: "/parts/"+item.partid+"/charpters"
                            }} ><h3 style={{fontSize:18,fontWeight:'bold',color:'#333'}}>{item.name}</h3></Link>
                            <div style={{fontSize:13,color:'#999'}}>
                                {item.charpter.slice(0,3).map((charpter)=>(
                                    <p key={'charpter_'+charpter}>{charpter}</p>
                                ))}
                                {item.charpter.length>3?<p>....</p>:null}
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default Listpart;