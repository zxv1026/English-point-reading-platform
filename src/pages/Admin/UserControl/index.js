import React, { Component } from "react";
import { Button, Table, Popconfirm, Icon,Popover } from "antd";
import moment from 'moment';
import UsersModal from './usersModal';
import Condition from './condition';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register, update, remove, getUserList, resetpassword } from "../../../redux/user_redux";
import './index.less';

@connect(
    state => state.user,
    {register, update, remove, getUserList, resetpassword}
)
class UserControl extends Component {
    constructor(props) {
        super(props);
        this.state={
            create: true,
            retrieveVisible: false,
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
    resetPasswords(id,pas){
        const data = {
            oldpassword: pas,
            password: 12345678,
        }
        this.props.resetpassword(id, data);
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
        const { list } = this.props
        const { create } = this.state
        const columns = [
            {
                title: '头像',
                dataIndex: 'avatar',
                key: 'avatar',
                render: v => <img className='img' alt='用户头像' src={require(`../../../assets/images/user/${v}.jpg`)}/>
            },
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
                defaultSortOrder: 'ascend',
                sorter: (a,b) => (moment(a.created).isBefore(b.created) ? 1 : -1),
                render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
            {
                title: '操作',
                key: 'operation',
                width: 250,
                render: (text, record)=>{
                    return (
                        <span>
                            <Link to={{
                                pathname:'/admin/avatarchoose',
                                state:{
                                    path: '/admin',
                                    id: record._id,
                                    avatar: record.avatar
                                }
                            }}><Button className='button' type="primary">修改头像</Button></Link>
                            <UsersModal
                                onOk={(user) =>{
                                    this.updateUser(record._id,user);
                                }}
                                record={record}
                            >
                                <Button className='button' type="primary">修改</Button>
                            </UsersModal>
                            <Popconfirm
                                title="确定重置密码吗?"
                                cancelText="取消"
                                okText="确认"
                                onConfirm={() => {
                                    this.resetPasswords(record._id,record.password);
                                }}
                            >
                                <Button className='button' type="primary">重置密码</Button>
                            </Popconfirm>
                            <Popconfirm
                                title="确定删除吗?"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                cancelText="取消"
                                okText="确认"
                                onConfirm={() => {
                                    this.delectUser(record);
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
                        dataSource={list}
                        rowKey="id"
                        pagination={{showQuickJumper:true}}
                    />
                </div>
            </div>
        )
    }
}

export default UserControl;