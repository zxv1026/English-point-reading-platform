import React,{Component} from 'react';
import { Link } from "react-router-dom";
import { Icon, List,Tooltip } from "antd";

class ListDetail extends Component {
    
    render() {
        const { list,partid } = this.props
        const IconText = ({ type, text,title }) => (
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
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 8,
                    }}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item
                            key={"detail_"+item.detailid}
                            actions={[
                                <IconText type="heart-o" text={item.collectnum} title="收藏数"/>, 
                                <IconText type="like-o" text={item.num} title="点赞数" />, 
                                <IconText type="message" text={item.commentnum} title="评论数"/>]}
                            extra={<img width={272} alt="logo" src={require(`../../../../assets/images/def.png`)} />}
                        >
                            <Link to={{
                                pathname: "/parts/"+partid+"/charpters/"+item.charpterid+"/details/"+item.detailid+'/contents',
                            }} ><h3>{item.name}</h3></Link>
                            <div style={{fontSize:13,color:'#999'}}>
                                {item.content?item.content.slice(0,2).map((content)=>(
                                    <div>
                                        <p>{content.chinese}</p>
                                        <p>{content.english}</p>
                                    </div>
                                )):null}
                                {item.content?(item.content.length>2?<p>....</p>:null):null}
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default ListDetail;
