import React, { Component } from 'react';
import MainComponent from "../Components/mainComponentPart";
import {getAuthorizationHeader} from "../functions";
import {Tag, TagField} from "../Components/Card";

class TagSearch extends Component {
    constructor(props){
        super(props);
        // console.log("check profile from <Route>", props.profile);
        let dataList = [];    
        this.state = {"dataList": dataList, "currentUserId": "",list:[] };
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
            // TODO: Tag data fix!
            if(res){
                this.setState({"dataList": res.content, "currentUserId": res.currentUserId});
                
                if(this.props.currentSelectedTag!=" "){
                    let list=[]
                    for (let i = 0; i <= this.state.dataList.length; i++){
                        for (let j = 0; j <=this.state.dataList[i].tagNameList.length; j++) {
                            if(this.state.dataList[i].tagNameList[j]==this.props.currentSelectedTag){
                                list.push(this.state.dataList[i]);
                            }
                        }
                        this.setState({list});
                    }
                    
                }
            }
        });
    }

    render(){
        return (
            <div>
                <div>
                    <p className="centre-this">Displaying the notes with <Tag tagName={this.props.currentSelectedTag}/></p>
                </div>

                <div className="columns is-multiline">
                    {this.state.list.map((data, index) => <MainComponent {...data} currentUserId={this.state.currentUserId} key={index} />)}
                </div>
            </div>
        );
    }
}



export default TagSearch;