import React,{Component} from 'react';
import { Link } from "react-router-dom";
import { Icon, List,Tooltip } from "antd";

class ListCharpters extends Component {
    
    render() {
        const { list } = this.props
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
                    // pagination={{
                    //     onChange: (page) => {
                    //         console.log(page);
                    //     },
                    //     pageSize: 3,
                    // }}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item
                            key={"charpter_"+item.charpterid}
                            actions={[
                                <IconText type="heart-o" text={item.collectnum} title="收藏数"/>, 
                                <IconText type="like-o" text={item.likenum} title="点赞数"/>, 
                                <IconText type="message" text={item.commentnum} title="评论数"/>]}
                            extra={<img width={272} alt="logo" src={require(`../../../../assets/images/def.png`)} />}
                        >
                            <Link to={{
                                pathname: "/parts/"+item.partid+"/charpters/"+item.charpterid+"/details",
                            }} ><h3>{item.name}</h3></Link>
                            <div style={{fontSize:13,color:'#999'}}>
                                {item.detail.slice(0,3).map((detail)=>(
                                    <p key={'detail_'+detail}>{detail}</p>
                                ))}
                                {item.detail.length>3?<p>....</p>:null}
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default ListCharpters;
