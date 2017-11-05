/**
 * Created by reiven on 2017/11/04.
 */
import React, { Component } from 'react';
import MainComponent from "../Components/mainComponentPart";

class AllNote extends Component {
    constructor(props){
        super(props);
        let dataList = [];
        // demo data
        for(let i = 0; i < 20; i++){
            let data = {
                "title": "main item" + i,
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
                    <p className="centre-this title">All Note</p>
                </div>

                <div className="columns is-multiline">
                    {this.state.dataList.map((data, index) => <MainComponent {...data} key={index}/>)}
                </div>
            </div>
        );
    }
}



export default AllNote;