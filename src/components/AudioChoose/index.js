import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon,Select,Row, Col,Button,Form } from 'antd';
import { Howl } from 'howler';
import { connect } from 'react-redux';
import { updateMp3 } from "../../redux/detail_redux";

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
        const { id,path,detailname } = this.props.location.state;
        const { mp3 } = this.state;
        const AudioMapper = {
            "1": { name: 'Ch01-01' },
            "2": { name: 'Ch01-02早晨打招呼' },
            "3": { name: 'Ch01-03洗臉' },
            "4": { name: 'Ch01-04刷牙' },
            "5": { name: 'Ch01-05吃早餐' },
            "6": { name: 'Ch01-06用餐習慣和禮節' },
            "7": { name: 'Ch01-07上廁所' },
            "8": { name: 'Ch01-08爸爸去上班' },
            "9": { name: 'Ch01-09挑衣服' },
            "10": { name: 'Ch01-10穿衣服' },
            "11": { name: 'Ch01-11自己穿衣服' },
            "12": { name: 'Ch01-12梳頭髮' },
            "13": { name: 'Ch01-13 準備學校用品' },
            "14": { name: 'Ch01-14催促' },
            "15": { name: 'Ch01-15穿鞋子' },
            "16": { name: 'Ch01-16上學前的打招呼' },
            "17": { name: 'Ch01-17媽媽的叮嚀' },
            "18": { name: 'Ch01-18使用電梯/樓梯' },
            "19": { name: 'Ch01-19 搭校車' },
        }
        return (
            <div>
                <Link to={{
                    pathname: path
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
                                    onChange={(e)=>this.handleChange(e)}
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