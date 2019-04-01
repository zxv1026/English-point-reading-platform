import React,{Component} from 'react';
import { Icon, List, Button } from "antd";
import { Howl } from 'howler';

class ListContent extends Component {
    SoundPlay(mp3,offset, duration) {
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
        const { list,mp3 } = this.props;
        return (
            <div>
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
                            <Button type="primary" onClick={() =>this.SoundPlay(mp3,item.offset, item.duration)}>播放</Button>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default ListContent;
