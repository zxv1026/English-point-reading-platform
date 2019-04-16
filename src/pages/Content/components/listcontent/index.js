import React,{Component} from 'react';
import { Icon, List, Button,Row,Col } from "antd";
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
        console.log(list)
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
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={1}>{item.icon?<img className='content_icon' alt='用户头像' src={require(`../../../../assets/images/content/${item.icon}.jpg`)}/>:null}</Col>
                                <Col span={8}><span className='sentence'>{item.chinese}</span></Col>
                                <Col span={10}><span className='sentence'>{item.english}</span></Col>
                                <Button style={{float: 'right'}} type="primary" onClick={() =>this.SoundPlay(mp3,item.offset, item.duration)}>播放</Button>
                            </Row>
                            {item.promptType&&item.prompt?
                                <Row style={{marginTop:10}} type="flex" justify="space-around" align="middle">
                                    <Col span={12} offset={9}>
                                        <span className='sentence'>
                                            <Icon
                                                type='star'
                                                theme='filled'
                                                style={item.promptType === 'important' ? null: {fontSize:5}}
                                            />
                                            {item.prompt}
                                        </span>
                                    </Col>
                                </Row>:null
                            }
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default ListContent;
