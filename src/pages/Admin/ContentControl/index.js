import React, { Component } from "react";
import { Button, Table, Popconfirm, Icon,Popover } from "antd";
import moment from 'moment';
import ContentModal from './contentModal';
import Condition from './condition';
import { connect } from 'react-redux';
import { create, update, remove, getContentList } from "../../../redux/content_redux";
import { getDetailOne } from "../../../redux/detail_redux";
import { Howl } from 'howler';

@connect(
    state => ({
        contentlist: state.content.contentlist,
        mp3: state.detail.mp3,
    }),
    {create, update, remove, getContentList,getDetailOne}
)
class ContentControl extends Component {
    constructor(props) {
        super(props);
        this.state={
            create: true,
            retrieveVisible: false,
        }
    }
    componentDidMount() {
        this.props.getContentList();
    }
    delectContent(content) {
        this.props.remove(content);
    }
    updateContent(_id,content) {
        this.props.update(_id,content);
    }
    createContent(content) {
        this.props.create(content);
    }

    hide = () => {
        this.setState({
            retrieveVisible: false,
        });
    }

    handleVisibleChange = (retrieveVisible) => {
        this.setState({ retrieveVisible });
    }

    SoundPlay(mp3,offset, duration) {
        const Sounds = new Howl({
            src: [require(`../../../assets/mp3/${mp3}.mp3`)],
            sprite: {
                time: [offset, duration]
            }
        })
        Sounds.play("time")
    }
    render() {
        const { contentlist } = this.props
        const { create } = this.state
        console.log(contentlist)
        const columns = [
            {
                title: 'ContentID',
                dataIndex: 'contentid',
                key: 'contentid',
                fixed: 'left',
                width: 50,
                sorter: (a,b) => a.contentid - b.contentid,
                render: text => <a href=" ">{text}</a>,
            },
            {
                title: '中文语句',
                dataIndex: 'chinese',
                key: 'chinese',
                fixed: 'left',
                width: 100,
            },
            {
                title: '英文语句',
                dataIndex: 'english',
                key: 'english',
                fixed: 'left',
                width: 100,
            },
            {
                title: '话题ID',
                dataIndex: 'detailid',
                key: 'detailid',
                sorter: (a,b) => a.detailid - b.detailid,
            },
            {
                title: '话题名称',
                dataIndex: 'detailID.name',
                key: 'detailname',
            },
            {
                title: 'CharpterID',
                dataIndex: 'detailID.charpterid',
                key: 'charpterid',
                sorter: (a,b) => a.detailID.charpterid - b.detailID.charpterid,
            },
            {
                title: 'Charpter名称',
                dataIndex: 'detailID.charpterID.name',
                key: 'charptername',
            },
            {
                title: '章节ID',
                dataIndex: 'detailID.charpterID.partid',
                key: 'partid',
                sorter: (a,b) => a.detailID.charpterID.partid - b.detailID.charpterID.partid,
            },
            {
                title: '章节名称',
                dataIndex: 'detailID.charpterID.partID.name',
                key: 'partname',
            },
            {
                title: '音频',
                dataIndex: 'detailID.mp3',
                key: 'mp3',
            },
            {
                title: '音频偏移时间',
                dataIndex: 'offset',
                key: 'offset',
            },
            {
                title: '音频持续时间',
                dataIndex: 'duration',
                key: 'duration',
            },
            {
                title: 'Icon',
                dataIndex: 'icon',
                key: 'icon',
                render: (v) => {
                    return(
                        <span>
                            {v?<img className='img' alt='icon' src={require(`../../../assets/images/content/${v}.jpg`)}/>:null}
                        </span>
                    )}
            },
            {
                title: '提示类别',
                dataIndex: 'promptType',
                key: 'promptType',
            },
            {
                title: '提示内容',
                dataIndex: 'prompt',
                key: 'prompt',
            },
            {
                title: '创建时间',
                dataIndex: 'created',
                key: 'created',
                defaultSortOrder: 'ascend',
                sorter: (a,b) => (moment(a.created).isBefore(b.created) ? 1 : -1),
                render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: (text, record)=>{
                    return (
                        <span>
                            <Button 
                                className='button' 
                                type="primary" 
                                onClick={() =>this.SoundPlay(record.detailID.mp3,record.offset,record.duration)}
                            >播放音频</Button>
                            <ContentModal
                                onOk={(content) =>{
                                    this.updateContent(record._id, content);
                                }}
                                record={record}
                            >
                                <Button className='button' type="primary">修改</Button>
                            </ContentModal>
                            <Popconfirm
                                title="确定删除吗?"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                cancelText="取消"
                                okText="确认"
                                onConfirm={() => {
                                    this.delectContent(record);
                                }}
                            >
                                <Button className='button' type="danger">删除</Button>
                            </Popconfirm>
                        </span>
                    )
                }
            },
        ];
        return (
            <div>
                <h3 style={{ margin: '0px 0 20px' }}>Content管理</h3>
                <div className="whitebox" >
                    <ContentModal
                        onOk={(content) =>{
                            this.createContent(content);
                        }}
                        create={create}
                    >
                        <Button type="primary">创建Content</Button>
                    </ContentModal>
                    <Popover
                        placement="leftTop"
                        title="检索条件设置"
                        content={<Condition hide={this.hide}/>}
                        trigger="click"
                        visible={this.state.retrieveVisible}
                        onVisibleChange={this.handleVisibleChange}
                    >
                        <Button
                            style={{
                                position: "relative",
                                float: 'right',
                                marginRight: 10
                            }}
                        >
                            <Icon type="search" />
                            检索条件
                        </Button>
                    </Popover>
                </div>
                <div className="whitebox noPadding">
                    <Table
                        columns={columns}
                        dataSource={contentlist}
                        rowKey="id"
                        scroll={{ x: 1900 }}
                    />
                </div>
            </div>
        )
    }
}

export default ContentControl;