import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon,Select,Row, Col,Button,Form } from 'antd';
import { Howl } from 'howler';
import { connect } from 'react-redux';
import { updateMp3 } from "../../redux/detail_redux";
import { AudioMapper } from "../../utils/audio";
import { ButtonCompont } from '../../pages/Admin/DetailControl/style';

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
            Sounds: '',
            pause: false,
        }
    }
    componentDidMount(){
        const { mp3 } = this.props.location.state;
        const Sounds = new Howl({
            src: [require(`../../assets/mp3/${mp3}.mp3`)],
            onend: () => {
                this.setState({pause: false})
            }
        })
        this.setState({
            mp3: mp3,
            Sounds,
        })
    }
    SoundPlay() {
        const { Sounds,pause } = this.state;
        if(pause){
            Sounds.pause()
            this.setState({pause:false})
        }else{
            Sounds.play()
            this.setState({pause:true})
        }
    }
    handleChange(value) {
        const { Sounds } = this.state;
        Sounds.pause()
        const sounds = new Howl({
            src: [require(`../../assets/mp3/${value}.mp3`)],
            onend: () => {
                this.setState({pause: false})
            }
        })
        this.setState({
            mp3: value,
            Sounds: sounds,
            pause: false,
        })
        console.log(value);
    }
    updatemp3(id){
        const data = {
            mp3: this.state.mp3,
            _id: id
        }
        this.props.updateMp3(data)
    }
    playTime(){
        const { Sounds,pause } = this.state;
        if(Sounds){
            if(typeof Sounds.seek() === 'number'){
                return (
                    <div style={{ marginTop:15 }}>
                        <p style={Sounds&&!pause? null:{display:'none'}}>{Sounds&&!pause?`已经播放`+Sounds.seek().toFixed(0)+`秒`: null}</p>
                        <p style={pause? null : {display:'none'}}>{pause?`正在播放`: null}</p>
                    </div>
                )
            }else{
                return (
                    <div style={{ marginTop:15 }}>
                        <p>已经播放0秒</p>
                    </div>
                )
            }
            
        }
    }
    back(){
        //返回是如果音频还播放就关掉它
        const { Sounds } = this.state;
        Sounds.pause()
    }
    render() {
        const { id,path,detailname,pagenumber } = this.props.location.state;
        const { mp3,pause } = this.state;

        return (
            <div>
                <Link 
                    onClick={()=>this.back()}
                    to={{
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
                    <Col span={4} push={10}>
                        {this.playTime()}
                    </Col>
                    <Col span={4} push={6}>
                        <div style={{ marginTop:10,marginBottom:20 }}>
                            <ButtonCompont
                                className={pause ? 'pause' : null }
                                type="primary"
                                onClick={() =>this.SoundPlay()}
                            >{pause ? <div>暂停音频</div> : <div>播放音频</div>}</ButtonCompont>
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