import React, { Component } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import moment from 'moment';
import UsersModal from './usersModal';
import { connect } from 'react-redux';
import { register, update, remove, getUserList } from "../../../redux/user_redux";

@connect(
    state => state.user,
    {register, update, remove, getUserList}
)
class UserControl extends Component {
    constructor(props) {
        super(props);
        this.state={
            create: true,
        }
    }
    componentDidMount(){
        this.props.getUserList();
    }
    delectUser(user) {
        this.props.remove(user);
    }
    updateUser(id,user) {
        this.props.update(id,user);
    }
    createUser(user){
        this.props.register(user);
    }
    render() {
        const { msg,code,list } = this.props
        const { create } = this.state
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                render: text => <a href=" ">{text}</a>,
            },
            {
                title: '类别',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
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
                            <UsersModal
                                onOk={(user) =>{
                                    this.updateUser(record._id,user);
                                }}
                                record={record}
                                msg={msg}
                            >
                                <Button type="primary">修改</Button>
                            </UsersModal>
                            <Popconfirm
                                title="确定删除吗?"
                                cancelText="取消"
                                okText="确认"
                                onConfirm={() => {
                                    this.delectUser(record);
                                }}
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
                {code?this.componentDidMount():null}
                <h3 style={{ margin: '0px 0 20px' }}>用户管理</h3>
                <div className="whitebox" >
                    <UsersModal
                        create={create}
                        onOk={(user) =>{
                            this.createUser(user);
                        }}
                    >
                        <Button type="primary">创建用户</Button>
                    </UsersModal>
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

export default UserControl;