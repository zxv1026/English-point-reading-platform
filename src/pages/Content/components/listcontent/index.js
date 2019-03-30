import React,{Component} from 'react';
import { Link } from "react-router-dom";
import { Icon, List, Button } from "antd";

class ListDetail extends Component {
    
    render() {
        const { list,partid,charpterid } = this.props
        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
        return (
            <div>
                <Link className="close-detail" to={{
                    pathname: "/parts/" + partid + "/charpters/"  + charpterid + "/details"
                }}>
                    <Icon type="caret-left"/>Back
                </Link>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={list}
                    renderItem={item => (
                        <List.Item
                            key={"content_"+item.contentid}
                        >
                            <p>{item.chinese}</p>
                            <p>{item.english}</p>
                            <Button type="primary">播放</Button>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default ListDetail;
