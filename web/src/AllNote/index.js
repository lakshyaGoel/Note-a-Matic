/**
 * Created by reiven on 2017/11/04.
 */
import React, { Component } from 'react';
import MainComponent from "../Components/mainComponentPart";
import {getAuthorizationHeader} from "../functions";

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


    componentDidMount(){
        let request = new Request('/api/db/test_db', {// TODO: if you need to know how it works, fix url to "/api/db/test" instead of "/api/db/test_db". But do not use too much.
            method: 'GET',
            headers: getAuthorizationHeader()
        });

        fetch(request)
        .then(response => {
           if(!response.ok) {
               console.log("Error: could not conect server, in AllNote/index.js");

           }
           console.log("api code detect");
           return response;
        }).then(res => {
            console.log(res.json());
        });
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