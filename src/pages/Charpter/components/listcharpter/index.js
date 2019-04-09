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
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item
                            key={"charpter_"+item.charpterid}
                            actions={[
                                <IconText type="heart-o" text={item.collectnum} title="收藏"/>, 
                                <IconText type="like-o" text={item.likenum} title="点赞"/>, 
                                <IconText type="message" text="2" />]}
                            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <Link to={{
                                pathname: "/parts/"+item.partid+"/charpters/"+item.charpterid+"/details",
                            }} ><h3>{item.name}</h3></Link>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default ListCharpters;
