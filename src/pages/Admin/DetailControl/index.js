import React, { Component } from "react";
import { Button, Table, Popconfirm, Icon,Popover } from "antd";
import moment from 'moment';
import DetailModal from './detailModal';
import Condition from './condition';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { create, update, remove, getDetailList } from "../../../redux/detail_redux";
import { Howl } from 'howler';


@connect(
    state => ({
        detaillist: state.detail.detaillist,
    }),
    {create, update, remove, getDetailList}
)
class DetailControl extends Component {
    constructor(props) {
        super(props);
        this.state={
            create: true,
        }
    }
    componentDidMount() {
        this.props.getDetailList();
    }
    delectDetail(detail) {
        this.props.remove(detail);
    }
    updateDetail(_id, detail) {
        this.props.update(_id, detail);
    }
    createDetail(detail) {
        this.props.create(detail);
    }

    hide = () => {
        this.setState({
            retrieveVisible: false,
        });
    }

    handleVisibleChange = (retrieveVisible) => {
        this.setState({ retrieveVisible });
    }
    
    SoundPlay(mp3) {
        const Sounds = new Howl({
            src: [require(`../../../assets/mp3/${mp3}.mp3`)],
        })
        Sounds.play()
    }
    render() {
        const { detaillist } = this.props
        const { create } = this.state
        const columns = [
            {
                title: 'DetailID',
                dataIndex: 'detailid',
                key: 'detailid',
                sorter: (a,b) => a.detailid - b.detailid,
                render: text => <a href=" ">{text}</a>,
            },
            {
                title: 'Detail名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'CharpterID',
                dataIndex: 'charpterid',
                key: 'charpterid',
                sorter: (a,b) => a.charpterid - b.charpterid,
            },
            {
                title: 'Charpter名称',
                dataIndex: 'charpterID.name',
                key: 'charptername',
            },
            {
                title: '章节ID',
                dataIndex: 'charpterID.partid',
                key: 'partid',
                sorter: (a, b) => a.charpterID.partid - b.charpterID.partid,
            },
            {
                title: '章节名称',
                dataIndex: 'charpterID.partID.name',
                key: 'partname',
            },
            {
                title: '音频',
                dataIndex: 'mp3',
                key: 'mp3',
            },
            {
                title: '点赞数',
                dataIndex: 'num',
                key: 'num',
                sorter: (a, b) => a.num - b.lnum,
            },
            {
                title: '收藏数',
                dataIndex: 'collectnum',
                key: 'collectnum',
                sorter: (a, b) => a.collectnum - b.collectnum,
            },
            {
                title: '评论数',
                dataIndex: 'commentnum',
                key: 'commentnum',
                sorter: (a, b) => a.commentnum - b.commentnum,
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
                render: (text, record)=>{
                    return (
                        <span>
                            <Button 
                                className='button' 
                                type="primary" 
                                onClick={() =>this.SoundPlay(record.mp3)}
                            >播放音频</Button>
                            <Link to={{
                                pathname:'/admin/audiochoose',
                                state:{
                                    path: '/admin/detail',
                                    id: record._id,
                                    mp3: record.mp3,
                                    detailname: record.name
                                }
                            }}><Button className='button' type="primary">修改音频</Button></Link>
                            <DetailModal
                                onOk={(detail) =>{
                                    this.updateDetail(record._id, detail);
                                }}
                                record={record}
                            >
                                <Button className='button' type="primary">修改</Button>
                            </DetailModal>
                            <Popconfirm
                                title="确定删除吗?"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                cancelText="取消"
                                okText="确认"
                                onConfirm={() => {
                                    this.delectDetail(record);
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
                <h3 style={{ margin: '0px 0 20px' }}>Detail管理</h3>
                <div className="whitebox" >
                    <DetailModal
                        onOk={(detail) =>{
                            this.createDetail(detail);
                        }}
                        create={create}
                    >
                        <Button type="primary">创建Detail</Button>
                    </DetailModal>
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
                        dataSource={detaillist}
                        rowKey="id"
                    />
                </div>
            </div>
        )
    }
}

export default DetailControl;