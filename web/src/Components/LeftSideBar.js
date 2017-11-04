import React, { Component } from 'react';
import './Style.css';

class LeftSideBar extends Component {

  render() {
    
    return (
        <div className="customLeftSideBar">
            <p>LeftSideBar</p>
            
            <img className="img-circle" src={this.props.profile.picture} alt="Placeholder image" />
            <div><a className="centre-this" class="is-small is-active" href="#" onClick={this.props.displayTextUser.bind(this)}>{this.props.profile.nickname}</a></div>
            
            <div><a className="centre-this is-active" id="myLink" href="#" onClick={this.props.displayTextAllNotes.bind(this)}>All Notes</a></div>
            <div><a id="myLink" title="Click to do something" href="#" onClick={this.props.displayTextMyNotes.bind(this)}>My Notes</a></div>
            <div><a className="centre-this" id="myLink" href="#" onClick={this.props.displayTextSharedNotes.bind(this)}>Shared Notes</a></div>

 
        </div>
    );
  }
}

export default LeftSideBar;
