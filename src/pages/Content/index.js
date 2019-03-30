import React, { Component } from "react";
import Header from '../../components/Header/index';
import ListContent from './components/listcontent';
import { connect } from 'react-redux';
import { getContentListOne } from "../../redux/content_redux";
import { getDetailOne } from "../../redux/detail_redux";

@connect(
    state => ({
        contentlist: state.content.contentlist,
        mp3: state.detail.mp3,
    }),
    {getContentListOne,getDetailOne}
)
class Content extends Component {
    componentDidMount() {
        let state={id:0};
        state.id = this.props.match.params.detailId
        this.props.getDetailOne(state)
        this.props.getContentListOne(state)
    }
    render() {
        const { contentlist,mp3 } = this.props
        console.log(this.props)
        console.log(mp3)
        return (
            <div>
                <Header/>
                <ListContent
                    list={contentlist}
                    partid={this.props.match.params.partId}
                    charpterid={this.props.match.params.charpterId}
                    mp3={mp3}
                />
            </div>
        )
    }
}

export default Content;