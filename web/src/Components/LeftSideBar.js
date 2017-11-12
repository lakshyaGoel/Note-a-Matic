import React, { Component } from 'react';
import './Style.css';
import {Link} from 'react-router-dom';
import {TagWCount, TagField} from "./Card";
import {getAuthorizationHeader, getUserId} from "../functions";

class LeftSideBar extends Component {
    constructor(props){
        super(props);
        let dataList = [];
        this.state = {
            tags: [], tempTagList:[],tagSS:[], "dataList": dataList, "currentUserId": ""
        };
        this.displayTag = this.displayTag.bind(this);
        
    }
    
    displayTag(value){
        
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
                this.setState({"dataList": res.content, "currentUserId": res.currentUserId});
                let tags=[], tagSS=[]
                for (let i = 0; i <= this.state.dataList.length; i++) {
                  this.setState({
                    tempTagList: []
                  });
                  this.setState({
                    tempTagList: this.state.dataList[i].tagNameList
                  });
                  console.log(this.state.tempTagList);
                  console.log("hi");
                  for (var j = 0; j < this.state.tempTagList.length; j++) {
                    console.log("hi1");
                    console.log(this.state.tempTagList[j] in tagSS);
                    console.log("hi2");
                    if (Object(this.state.tempTagList[j]) in tagSS) {
                      tags.push({
                        "tagName": this.state.tempTagList[j],
                        "count": tags[tags.findIndex(this.state.tempTagList[j])].count + 1
                      });
                      console.log(tags);
                      console.log("hi3");
                    } else {
                      tagSS.push(this.state.tempTagList[j]);
                      tags.push({
                        "tagName": this.state.tempTagList[j],
                        "count": 1
                      });
                      console.log(tagSS);
                      console.log("hi4");
                    }
                  }
                  this.setState({tags, tagSS})
                  console.log(this.state.tags);
                  
                }
                
                
        }
        });
    }
  render() {
    
      // TODO: use Bulma CSS. Read Bulma documentation.
    return (
        <div className="customLeftSideBar">
            
            <img className="img-circle" src={this.props.profile.picture} alt="Placeholder" />
            <div><Link className="centre-this is-small is-active" to={"/user-info"} onClick={this.props.displayTextUser.bind(this)}>{this.props.profile.nickname}</Link></div>
            {/*
            <div><a className="centre-this is-active" id="myLink" href="#" onClick={this.props.displayTextAllNotes.bind(this)}>All Notes</a></div>
            <div><a id="myLink" title="Click to do something" href="#" onClick={this.props.displayTextMyNotes.bind(this)}>My Notes</a></div>
            <div><a className="centre-this" id="myLink" href="#" onClick={this.props.displayTextSharedNotes.bind(this)}>Shared Notes</a></div>

            Use <Link> instead of <a>, it is React-router functionality. Read the document.
             */}
            <div><Link className="centre-this is-active" id="myLink" to={"/all-note"} onClick={this.props.displayTextAllNotes.bind(this)}>All Notes</Link></div>
            <div><Link id="myLink" title="Click to do something" to={"/my-note"} onClick={this.props.displayTextMyNotes.bind(this)}>My Notes</Link></div>
            <div><Link className="centre-this" id="myLink" to={"/share-note"} onClick={this.props.displayTextSharedNotes.bind(this)}>Shared Notes</Link></div>
            <br/><br/><br/><br/><br/><br/><br/>
             <div><p>My Tags</p>
                <TagField>
                   {/*{this.props.tagNameList.map((tagData, key) => <Tag tagName={tagData} key={key.toString()}/>)}   
                    */} {this.state.tags.map((tagData, key) => <TagWCount tagName={tagData.tagName} tagCount={tagData.count} setTagValue={this.displayTag} key={key.toString()}/>)}
                </TagField></div>
        </div>
    );
  }
}

export default LeftSideBar;
