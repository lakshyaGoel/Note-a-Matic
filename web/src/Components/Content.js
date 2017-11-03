import React, { Component } from 'react';
import './Style.css';

import Pin from './Pin';
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
        "description": "This is item demo discription1",
        "content": "might be main content goes here",
        "tags": [
            {"tagName": "tag1"},
            {"tagName": "tag2"},
            {"tagName": "tag3"}
        ]
    },
    {
        "title": "item3",
        "description": "This is item demo discription1",
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
            <div>{/*
             <Pin />
             */}
                {/*
                 active version is here
                 <Modal active={true}/>


                 */}
                <div className="columns is-multiline">

                    {demoData.map(data => <MainCmponent {...data}/>)}
                </div>
            </div>
        );
    }
}

export default Content;
