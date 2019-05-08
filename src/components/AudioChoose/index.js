import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon,Select,Row, Col,Button,Form } from 'antd';
import { Howl } from 'howler';
import { connect } from 'react-redux';
import { updateMp3 } from "../../redux/detail_redux";
import { AudioMapper } from "../../utils/audio";

const { Option } = Select;

@connect(
    state => ({

    }),
    { updateMp3 }
)
class AudioChoose extends Component{
    constructor(props) {
        super(props);
        this.state = {
            mp3: '',
        }
    }
    componentDidMount(){
        const { mp3 } = this.props.location.state;
        this.setState({
            mp3: mp3,
        })
    }
    SoundPlay() {
        const { mp3 } = this.state;
        const Sounds = new Howl({
            src: [require(`../../assets/mp3/${mp3}.mp3`)],
        })
        Sounds.play()
    }
    handleChange(value) {
        this.setState({
            mp3: value,
        })
        console.log(value);
    }
    updatemp3(id){
        this.props.updateMp3(id,this.state)
    }
    render() {
        const { id,path,detailname,pagenumber } = this.props.location.state;
        const { mp3 } = this.state;
        
        return (
            <div>
                <Link to={{
                    pathname: path,
                    pagenumber: pagenumber,
                }}>
                    <Icon type="caret-left"/>
                    Back
                </Link>
                <Row type="flex" justify="space-between">
                    <Col span={4}>
                        <div style={{ marginTop:10,marginBottom:20 }}>
                            <span>{detailname} 音频：</span>
                            <span>
                                <Select
                                    style={{ minWidth: 400 }}
                                    value={mp3}
                                    onChange={(v)=>this.handleChange(v)}
                                    >
                                    {Object.keys(AudioMapper).map(key => {
                                        return <Option
                                        key={key}
                                        value={AudioMapper[key].name}
                                        >
                                            {AudioMapper[key].name}
                                        </Option>
                                    })}
                                </Select>
                            </span>
                        </div>
                    </Col>
                    <Col span={4} push={8}>
                        <div style={{ marginTop:10,marginBottom:20 }}>
                            <Button type="primary" onClick={() => this.SoundPlay()}>播放音频</Button>
                        </div>
                    </Col>
                    <Col span={4} push={2}>
                        <div style={{ marginTop:10,marginBottom:20 }}>
                            <Button type="primary" onClick={() => this.updatemp3(id)}>保存音频</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create()(AudioChoose);