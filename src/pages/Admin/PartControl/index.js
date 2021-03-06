import React, { Component } from "react";
import { Button, Table, Popconfirm, Icon,Popover } from "antd";
import moment from 'moment';
import PartModal from './partModal';
import Condition from './condition';
import { connect } from 'react-redux';
import { create, update, remove, getPartList } from "../../../redux/part_redux";

@connect(
    state => state.part,
    {create, update, remove, getPartList}
)
class PartControl extends Component {
    constructor(props) {
        super(props);
        this.state={
            create: true,
            retrieveVisible: false,
        }
    }
    componentDidMount() {
        this.props.getPartList();
    }
    delectPart(part) {
        this.props.remove(part);
    }
    updatePart(_id,part) {
        this.props.update(_id,part);
    }
    createPart(part) {
        this.props.create(part);
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

        const { partlist } = this.props
        const { create } = this.state

        const columns = [
            {
                title: 'PartID',
                dataIndex: 'partid',
                key: 'partid',
                sorter: (a,b) => a.partid - b.partid,
                render: text => <a href=" ">{text}</a>,
            },
            {
                title: 'Part名',
                dataIndex: 'name',
                key: 'name',
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
                            <PartModal
                                onOk={(part) =>{
                                    this.updatePart(record._id, part);
                                }}
                                record={record}
                            >
                                <Button className='button' type="primary">修改</Button>
                            </PartModal>
                            <Popconfirm
                                title="确定删除吗?"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                cancelText="取消"
                                okText="确认"
                                onConfirm={() => {
                                    this.delectPart(record);
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
            <span>
                <h3 style={{ margin: '0px 0 20px' }}>Part管理</h3>
                <div className="whitebox" >
                    <PartModal
                        onOk={(part) =>{
                            this.createPart(part);
                        }}
                        create={create}
                    >
                        <Button type="primary">创建Part</Button>
                    </PartModal>
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
                        dataSource={partlist}
                        rowKey="id"
                        pagination={{showQuickJumper:true}}
                    />
                </div>
            </span>
        )
    }
}

export default PartControl;