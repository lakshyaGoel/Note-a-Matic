/**
 * Created by reiven on 2017/11/04.
 */
import React, { Component } from 'react';
import MainComponent from "../Components/mainComponentPart";

class ShareNote extends Component {
    constructor(props){
        super(props);
        let dataList = [];
        // demo data
        for(let i = 0; i < 10; i++){
            let data = {
                "title": "share item" + i,
                "description": "description" + i,
                "content": "main content " + i,
                "tags": []
            };
            for(let j = 0; j < 3; j++){
                data.tags.push({"tagName": "tag" + j});
            }
            dataList.push(data);
        }

        this.state = {"dataList": dataList};
    }
    render(){
        return (
            <div>
                <div>
                    <p className="centre-this title">Share Note</p>
                </div>

                <div className="columns is-multiline">
                    {this.state.dataList.map((data, index) => <MainComponent {...data} key={index}/>)}
                </div>
            </div>
        );
    }
}



export default ShareNote;