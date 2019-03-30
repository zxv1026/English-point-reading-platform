import React, { Component } from "react";
import Header from '../../components/Header/index';
import ListDetail from './components/listdetail';
import { connect } from 'react-redux';
import { getDetailListOne } from "../../redux/detail_redux";

@connect(
    state => state.detail,
    {getDetailListOne}
)
class Detail extends Component {
    componentDidMount() {
        let state={id:0};
        state.id = this.props.match.params.charpterId
        this.props.getDetailListOne(state)
    }
    render() {
        const { list } = this.props
        console.log(list);
        return (
            <div>
                <Header/>
                <ListDetail
                    list={list}
                    partid={this.props.match.params.partId}
                />
            </div>
        )
    }
}

export default Detail;