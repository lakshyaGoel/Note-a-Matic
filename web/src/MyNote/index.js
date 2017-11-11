/**
 * Created by reiven on 2017/11/04.
 */
import React, { Component } from 'react';
import MainComponent from "../Components/mainComponentPart";
import {getAuthorizationHeader} from "../functions";


class MyNote extends Component {
    constructor(props){
        super(props);

        let dataList = [];
        // demo data
        for(let i = 0; i < 5; i++){
            let data = {
                "title": "my item" + i,
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
        let request = new Request('/api/db/all-note', {
            method: 'POST',
            headers: {
                "Authorization": getAuthorizationHeader().Authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.props.profile)
        });

        // TODO: write re-rendering with setState and binding.
        fetch(request)
        .then(response => {
           if(!response.ok) {
               console.log("Error: could not conect server, in AllNote/index.js");
               return false;
           }
           return response.json();
        }).then(res => {
            console.log("this is allnote result",res);// This is Note data! parse here.
            // TODO: Tag data fix!
            if(res){
                this.setState({"dataList": res});
            }
        });
    }

    render(){
        return (
            <div>
                <div>
                    <p className="centre-this title">My Note</p>
                </div>

                <div className="columns is-multiline">
                    {this.state.dataList.map((data, index) => <MainComponent {...data} key={index}/>)}
                </div>
            </div>
        );
    }
}



export default MyNote;