import React, { Component } from "react";
import Header from '../../components/Header/index';
import ListContent from './components/listcontent';
import { connect } from 'react-redux';
import { getContentListOne } from "../../redux/content_redux";

@connect(
    state => state.content,
    {getContentListOne}
)
class Content extends Component {
    componentDidMount() {
        let state={id:0};
        state.id = this.props.match.params.detailId
        this.props.getContentListOne(state)
    }
    render() {
        const { list } = this.props
        console.log(list);
        return (
            <div>
                <Header/>
                <ListContent
                    list={list}
                    partid={this.props.match.params.partId}
                    charpterid={this.props.match.params.charpterId}
                />
            </div>
        )
    }
}

export default Content;