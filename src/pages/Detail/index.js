import React, { Component } from "react";
import Header from '../../components/Header/index';
import { Link } from "react-router-dom";
import { Icon, } from "antd";
import ListDetail from './components/listdetail';
import { connect } from 'react-redux';
import { getDetailListOne } from "../../redux/detail_redux";
import { getCharpterOne } from "../../redux/charpter_redux";

@connect(
    state => ({
        detaillist: state.detail.detaillist,
        charptername: state.charpter.name,
    }),
    {getDetailListOne,getCharpterOne}
)
class Detail extends Component {
    componentDidMount() {
        let state={id:0};
        state.id = this.props.match.params.charpterId
        this.props.getDetailListOne(state)
        this.props.getCharpterOne(state)
    }
    render() {
        const { detaillist,charptername } = this.props
        return (
            <div style={{paddingTop:56}}>
                <Header path={this.props.location.pathname}/>
                <Link className="close-detail" to={{
                    pathname: "/parts/" + this.props.match.params.partId + "/charpters"
                }}>
                    <Icon type="caret-left"/>Back
                </Link>
                <div className='content'>
                    <div style={{textAlign:'center'}}>
                        <h2>{charptername}</h2>
                    </div>
                    <ListDetail
                        list={detaillist}
                        partid={this.props.match.params.partId}
                    />
                </div>
            </div>
        )
    }
}

export default Detail;