import React, { Component } from 'react';
import './Style.css';

import MainCmponent from "./mainComponentPart";

var demoData = [
    {
        "title": "item1",
        "description": "This is item demo discription1",
        "content": "might be main content goes here",
        "tags": [
            {"tagName": "tag1"},
            {"tagName": "tag2"},
            {"tagName": "tag3"}
        ]
    },
    {
        "title": "item2",
        "description": "This is item demo discription2",
        "content": "might be main content goes here",
        "tags": [
            {"tagName": "tag1"},
            {"tagName": "tag2"},
            {"tagName": "tag3"}
        ]
    },
    {
        "title": "item3",
        "description": "This is item demo discription3",
        "content": "might be main content goes here",
        "tags": [
            {"tagName": "tag1"},
            {"tagName": "tag2"},
            {"tagName": "tag3"}
        ]
    }
]


class Content extends Component {
    render(){
        return (
            <div>
                <div className="columns is-multiline">

                    {demoData.map((data, index) => <MainCmponent {...data} key={index}/>)}
                </div>
            </div>
        );
    }
}

export default Content;
