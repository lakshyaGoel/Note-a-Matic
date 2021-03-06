import React, { Component } from 'react';
import MainComponent from "../Components/mainComponentPart";
import {getAuthorizationHeader} from "../functions";

class Search extends Component {
  constructor(props){
    super(props);
  
    let dataList = [];    
    this.state = {"dataList": dataList, "currentUserId": ""};
  }

  componentDidMount(){
    //console.log("Data Value ================"+document.getElementById('sfield').value);
    //console.log("In Search :"+this.props.value);
    let request = new Request('/api/db/search-note', {
        method: 'POST',
        headers: {
            "Authorization": getAuthorizationHeader().Authorization,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(this.props)
    });

    // TODO: write re-rendering with setState and binding.
    fetch(request)
    .then(response => {
       if(!response.ok) {
           console.log("Error: could not conect server, in Search/index.js");
           return false;
       }
       return response.json();
    }).then(res => {
        // TODO: Tag data fix!
        if(res){
            this.setState({"dataList": res.content, "currentUserId": res.currentUserId});
        }
    });
  }
  

  render() {
    return (
              
      <div>  
        Search Results
        <div className="columns is-multiline">
            {this.state.dataList.map((data, index) => <MainComponent {...data} currentUserId={this.state.currentUserId} key={index} />)}
        </div>
      </div>
    );
  }
}

export default Search;
