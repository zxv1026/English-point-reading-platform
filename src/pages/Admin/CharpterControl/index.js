import React, { Component } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import moment from 'moment';
import CharpterModal from './charpterModal';
import { connect } from 'react-redux';
import { create, update, remove, getCharpterList } from "../../../redux/charpter_redux";

@connect(
    state => state.charpter,
    {create, update, remove, getCharpterList}
)
class PartControl extends Component {
    constructor(props) {
        super(props);
        this.state={
            create: true,
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
    render() {
        const { msg,list } = this.props
        const { create } = this.state
        const columns = [
            {
                title: 'CharpterID',
                dataIndex: 'id',
                key: 'id',
                render: text => <a href=" ">{text}</a>,
            },
            {
                title: 'PartID',
                dataIndex: 'partid',
                key: 'partid',
            },
            {
                title: 'Charpter名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'created',
                key: 'created',
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
                {msg?message.error("编辑Charpter失败！ "+msg,5): null}
                <h3 style={{ margin: '0px 0 20px' }}>CharPart管理</h3>
                <div className="whitebox" >
                    <CharpterModal
                        onOk={(charpter) =>{
                            this.createCharpter(charpter);
                        }}
                        create={create}
                    >
                        <Button type="primary">创建Charpter</Button>
                    </CharpterModal>
                </div>
                <div className="whitebox noPadding">
                    <Table
                        columns={columns}
                        dataSource={list}
                        rowKey="id"
                    />
                </div>
            </div>
        )
    }
}

export default PartControl;