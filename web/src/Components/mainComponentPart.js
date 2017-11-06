import React, {Component} from "react";

import Modal from "./Modal";
import {Card, CardButtons, Tag, TagField} from "./Card";


class MainComponent extends Component{
    render(){
        return  (
                <Card cardTitle={this.props.title}>
                    {this.props.description}
                    <CardButtons/>
                    <TagField>
                        {this.props.tags.map((tagData, key) => <Tag tagName={tagData.tagName} key={key.toString()}/>)}
                    </TagField>
                    {/*TODO: add Modal to card footer */}
                    <Modal title={this.props.title} buttonLabel="show content" content={this.props.content} />
                </Card>
            );

    }
}
export default MainComponent;