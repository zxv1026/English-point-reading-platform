import React,{Component} from 'react';
import { Link } from "react-router-dom";
import { Icon, List, Button } from "antd";
import { Howl } from 'howler';

class ListDetail extends Component {
    SoundPlay(offset, duration) {
        let mp3 = 'Ch01-01'
        const Sounds = new Howl({
            src: [require(`../../../../assets/mp3/${mp3}.mp3`)],
            sprite: {
                time: [offset, duration]
            }
        })
        Sounds.play("time")
        console.log("sound")
    }
    render() {
        const { list,partid,charpterid } = this.props;
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
                            <Button type="primary" onClick={() =>this.SoundPlay(item.offset, item.duration)}>播放</Button>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default ListDetail;
