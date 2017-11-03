import React, {Component} from "react";

import Modal from "./Modal";
import {Card, CardButtons, Tag, TagField} from "./Card";

class MainComponent extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.state.modalActive = false;

        this.showModal = this.showModal.bind(this);
    }

    showModal(){
        this.setState({modalActive: true});
    }

    render(){
        return (
        <Card cardTitle={this.props.title}>
            {this.props.description}
            <CardButtons/>
            <TagField>
                {this.props.tags.map(tagData => <Tag tagName={tagData.tagName}/>)}
            </TagField>
            <a className="button" onClick={this.showModal}>show Content</a>
        </Card>
        );
    }
}
export default MainComponent;