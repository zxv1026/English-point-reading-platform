import React, { Component } from "react";
import Header from '../../components/Header/index';
import { Link } from "react-router-dom";
import { Icon } from "antd";
import ListCharpter from './components/listcharpter';
import { connect } from 'react-redux';
import { getCharpterListOne } from "../../redux/charpter_redux";
import { getPartOne } from "../../redux/part_redux";

@connect(
    state => ({
        charpterlistone: state.charpter.charpterlistone,
        partname: state.part.name,
    }),
    {getCharpterListOne,getPartOne}
)
class Charpter extends Component {
    componentDidMount() {
        let state={id:1};
        state.id = this.props.match.params.partId
        this.props.getCharpterListOne(state)
        this.props.getPartOne(state);
    }
    render() {
        const { charpterlistone,partname } = this.props
        console.log(this.props)
        return (
            <div>
                <Header path={this.props.location.pathname}/>
                <Link className="close-charpter" to="/">
                    <Icon type="caret-left"/>
                    Back
                </Link>
                <div>
                    <h2>{partname}</h2>
                </div>
                <ListCharpter
                    list={charpterlistone}
                />
            </div>
        )
    }
}

export default Charpter;