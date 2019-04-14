import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Icon, List,Tooltip } from 'antd';

class Listpart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            partlist: []
        }
    }
    componentWillReceiveProps(nextProps) {
        const {list,charpterlist} = nextProps;
        let partlist = list;
        for (let i in list) {
            const charpterlistone = [];
            let x = 0;
            for (let j in charpterlist) {
                if (charpterlist[j].partid === list[i].partid) {
                    charpterlistone[x] = charpterlist[j].name
                    x++;
                }
            }
            partlist[i].charpter = charpterlistone;
        }
        if(nextProps!==this.props){
            this.setState({
                partlist: partlist
            })
            console.log('WRP_setState')
        }
        console.log('WillReceiveProps')
    }
    render() {
        // const {list,charpterlist} =this.props;
        const { partlist } = this.state;
        const IconText = ({ type, text ,title}) => (
            <span>
                <Tooltip title={title}>
                    <Icon type={type} style={{ marginRight: 8 }} />
                    {text}
                </Tooltip>
            </span>
        );
        return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={partlist}
                    renderItem={item => (
                        <List.Item
                            key={"part_"+item.partid}
                            actions={[
                                <IconText type="heart-o" text={item.collectnum} title="收藏"/>, 
                                <IconText type="like-o" text={item.likenum} title="点赞" />, 
                                <IconText type="message" text="2" />]}
                            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <Link to={{
                                pathname: "/parts/"+item.partid+"/charpters"
                            }} ><h3 style={{fontSize:18,fontWeight:'bold',color:'#333'}}>{item.name}</h3></Link>
                            <div style={{fontSize:13,color:'#999'}}>
                                {item.charpter.slice(0,3).map((charpter)=>(
                                    <p>{charpter}</p>
                                ))}
                                {item.charpter.length>3?<p>....</p>:null}
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default Listpart;