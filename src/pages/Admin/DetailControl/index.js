import React, { Component } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import moment from 'moment';
import DetailModal from './detailModal';
import { connect } from 'react-redux';
import { create, update, remove, getDetailList } from "../../../redux/detail_redux";

@connect(
    state => state.detail,
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
    render() {
        const { msg,list } = this.props
        const { create } = this.state
        const columns = [
            {
                title: 'DetailID',
                dataIndex: 'id',
                key: 'id',
                render: text => <a href=" ">{text}</a>,
            },
            {
                title: 'CharpterID',
                dataIndex: 'charpterid',
                key: 'charpterid',
            },
            {
                title: 'Detail名',
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
                {msg?message.error("编辑Detail失败！ "+msg,5): null}
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

export default DetailControl;