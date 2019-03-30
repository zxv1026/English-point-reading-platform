import React, { Component } from "react";
import Header from '../../components/Header/index';
import ListCharpter from './components/listcharpter';
import { connect } from 'react-redux';
import { getCharpterListOne } from "../../redux/charpter_redux";

@connect(
    state => state.charpter,
    {getCharpterListOne}
)
class Charpter extends Component {
    componentDidMount() {
        let state={id:1};
        state.id = this.props.match.params.partId
        this.props.getCharpterListOne(state)
    }
    render() {
        const { list } = this.props
        return (
            <div>
                <Header/>
                <ListCharpter
                    list={list}
                />
            </div>
        )
    }
}

export default Charpter;