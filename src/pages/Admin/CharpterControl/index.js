import React, { Component } from "react";
import { Button, Table, Popconfirm, Icon,Popover } from "antd";
import moment from 'moment';
import CharpterModal from './charpterModal';
import Condition from './condition';
import { connect } from 'react-redux';
import { create, update, remove, getCharpterList } from "../../../redux/charpter_redux";

@connect(
    state => ({
        charpterlist:state.charpter.charpterlist,
    }),
    {create, update, remove, getCharpterList}
)
class CharpterControl extends Component {
    constructor(props) {
        super(props);
        this.state={
            create: true,
            retrieveVisible: false,
        }
    }
    componentDidMount() {
        this.props.getCharpterList();
    }
    delectCharpter(charpter) {
        this.props.remove(charpter);
    }
    updateCharpter(_id,charpter) {
        this.props.update(_id,charpter);
    }
    createCharpter(charpter) {
        this.props.create(charpter);
    }

    hide = () => {
        this.setState({
            retrieveVisible: false,
        });
    }

    handleVisibleChange = (retrieveVisible) => {
        this.setState({ retrieveVisible });
    }
    render() {
        const { charpterlist } = this.props
        const { create } = this.state
        const columns = [
            {
                title: 'CharpterID',
                dataIndex: 'charpterid',
                key: 'charpterid',
                sorter: (a,b) => a.charpterid - b.charpterid,
                render: text => <a href=" ">{text}</a>,
            },
            {
                title: 'Charpter名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'PartID',
                dataIndex: 'partid',
                key: 'partid',
                sorter: (a,b) => a.partid - b.partid,
            },
            {
                title: '章节名称',
                dataIndex: 'partID.name',
                key: 'partname',
            },
            {
                title: '点赞数',
                dataIndex: 'likenum',
                key: 'likenum',
                sorter: (a, b) => a.likenum - b.likenum,
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
                            <CharpterModal
                                onOk={(charpter) =>{
                                    this.updateCharpter(record._id, charpter);
                                }}
                                record={record}
                            >
                                <Button className='button' type="primary">修改</Button>
                            </CharpterModal>
                            <Popconfirm
                                title="确定删除吗?"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                cancelText="取消"
                                okText="确认"
                                onConfirm={() => {
                                    this.delectCharpter(record);
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
                <h3 style={{ margin: '0px 0 20px' }}>Charpter管理</h3>
                <div className="whitebox" >
                    <CharpterModal
                        onOk={(charpter) =>{
                            this.createCharpter(charpter);
                        }}
                        create={create}
                    >
                        <Button type="primary">创建Charpter</Button>
                    </CharpterModal>
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
                        dataSource={charpterlist}
                        rowKey="id"
                        pagination={{showQuickJumper:true}}
                    />
                </div>
            </div>
        )
    }
}

export default CharpterControl;