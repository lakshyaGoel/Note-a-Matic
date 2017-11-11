import React, {Component} from "react";

import Modal from "./Modal";
import {Card, CardButtons, Tag, TagField} from "./Card";


class MainComponent extends Component{
    constructor(props){
        super(props);
        this.footer = (<footer className="card-footer">
            <Modal title={this.props.title} buttonLabel="show content" content={this.props.content} />
        </footer>);
    }

    render(){
        return  (
                <Card cardTitle={this.props.title} cardFooter={this.footer}>
                    {this.props.description}
                    <CardButtons likeCount={this.props.like.length} dislikeCount={this.props.dislike.length} />
                    <TagField>
                        {/*{this.props.tags.map((tagData, key) => <Tag tagName={tagData.tagName} key={key.toString()}/>)}*/}
                    </TagField>
                </Card>
            );

    }
}
export default MainComponent;