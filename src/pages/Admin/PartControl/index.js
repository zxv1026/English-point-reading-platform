import React, { Component } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import moment from 'moment';
import PartModal from './partModal';
import { connect } from 'react-redux';


class PartControl extends Component {
    constructor(props) {
        super(props);
        this.state={
            create: true,
        }
    }
    render() {
        const { msg,list } = this.props
        const { create } = this.state
        const columns = [
            {
                title: 'PartID',
                dataIndex: 'username',
                key: 'username',
                render: text => <a href=" ">{text}</a>,
            },
            {
                title: 'Part名',
                dataIndex: 'type',
                key: 'type',
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
                            <PartModal
                                record={record}
                            >
                                <Button type="primary">修改</Button>
                            </PartModal>
                            <Popconfirm
                                title="确定删除吗?"
                                cancelText="取消"
                                okText="确认"
                            >
                                <Button type="danger">删除</Button>
                            </Popconfirm>
                        </span>
                    )
                }
            },
        ];
        return (
            <div>
                {msg?message.error("编辑用户失败！ "+msg,5): null}
                <h3 style={{ margin: '0px 0 20px' }}>Part管理</h3>
                <div className="whitebox" >
                    <PartModal
                        create={create}
                    >
                        <Button type="primary">创建Part</Button>
                    </PartModal>
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