import React, { Component } from 'react';
import MainComponent from "../Components/mainComponentPart";
import {getAuthorizationHeader} from "../functions";

class AllNote extends Component {
    constructor(props){
        super(props);
        // console.log("check profile from <Route>", props.profile);
        let dataList = [];    
        this.state = {"dataList": dataList, "currentUserId": ""};
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
           try{
            return response.json();
           }catch(e){
            return false;
           }
        }).then(res => {
            // TODO: Tag data fix!
            if(res){
                this.setState({"dataList": res.content, "currentUserId": res.currentUserId});   
            }
        });
    }

    render(){
        return (
            <div>
                <div>
                    <p className="centre-this title" style={{"paddingBottom":"1rem"}}>All Notes</p>
                </div>

                <div className="columns is-multiline">
                    {this.state.dataList.map((data, index) => <MainComponent {...data} currentUserId={this.state.currentUserId} key={index} />)}
                </div>
            </div>
        );
    }
}



export default AllNote;