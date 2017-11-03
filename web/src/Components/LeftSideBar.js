import React, { Component } from 'react';
import './Style.css';


class LeftSideBar extends Component {
  gohere(){
    
  }
  render() {
    function gohere(){

    }
    console.log(this.props.profile)
    return (
        <div className="customLeftSideBar">
            <p>LeftSideBar</p>
            
            <img className="img-circle" src={this.props.profile.picture} alt="Placeholder image" />
            <div><a className="centre-this" class="is-small is-active" href="#" onclick="gohere();return false;">{this.props.profile.nickname}</a></div>
            
            <div><a className="centre-this is-active" id="myLink" href="#" onclick="gohere();return false;">All Notes</a></div>
            <div><a id="myLink" title="Click to do something" href="#" onclick="gohere();return false;">My Notes</a></div>
            <div><a className="centre-this" id="myLink" href="#" onclick="gohere();return false;">Shared Notes</a></div>

 
        </div>
    );
  }
}

export default LeftSideBar;

