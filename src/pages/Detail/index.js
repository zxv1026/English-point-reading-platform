import React, { Component } from "react";
import Header from '../../components/Header/index';
import ListDetail from './components/listdetail';
import { connect } from 'react-redux';
import { getDetailListOne } from "../../redux/detail_redux";

@connect(
    state => ({
        detaillist: state.detail.detaillist,
    }),
    {getDetailListOne}
)
class Detail extends Component {
    componentDidMount() {
        let state={id:0};
        state.id = this.props.match.params.charpterId
        this.props.getDetailListOne(state)
    }
    render() {
        const { detaillist } = this.props
        return (
            <div>
                <Header path={this.props.location.pathname}/>
                <ListDetail
                    list={detaillist}
                    partid={this.props.match.params.partId}
                />
            </div>
        )
    }
}

export default Detail;