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
        const { charpterlistone } = this.props
        return (
            <div>
                <Header path={this.props.location.pathname}/>
                <ListCharpter
                    list={charpterlistone}
                />
            </div>
        )
    }
}

export default Charpter;