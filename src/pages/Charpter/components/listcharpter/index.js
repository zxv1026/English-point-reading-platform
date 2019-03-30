import React,{Component} from 'react';
import { Link } from "react-router-dom";
import { Icon, List } from "antd";

class ListCharpters extends Component {
    
    render() {
        const { list } = this.props
        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
        return (
            <div>
                <Link className="close-charpter" to="/">
                    <Icon type="caret-left"/>
                    Back
                </Link>
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
                            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
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
