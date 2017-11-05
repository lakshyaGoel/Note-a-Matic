import React, { Component } from 'react';
import './Style.css';
import {Link} from 'react-router-dom';

class LeftSideBar extends Component {

  render() {

      // TODO: use Bulma CSS. Read Bulma documentation.
    return (
        <div className="customLeftSideBar">
            <p>LeftSideBar</p>
            
            <img className="img-circle" src={this.props.profile.picture} alt="Placeholder image" />
            <div><a className="centre-this is-small is-active" href="#" onClick={this.props.displayTextUser.bind(this)}>{this.props.profile.nickname}</a></div>
            {/*
            <div><a className="centre-this is-active" id="myLink" href="#" onClick={this.props.displayTextAllNotes.bind(this)}>All Notes</a></div>
            <div><a id="myLink" title="Click to do something" href="#" onClick={this.props.displayTextMyNotes.bind(this)}>My Notes</a></div>
            <div><a className="centre-this" id="myLink" href="#" onClick={this.props.displayTextSharedNotes.bind(this)}>Shared Notes</a></div>

            Use <Link> instead of <a>, it is React-router functionality. Read the document.
             */}
            <div><Link className="centre-this is-active" id="myLink" to={"/all-note"} onClick={this.props.displayTextAllNotes.bind(this)}>All Notes</Link></div>
            <div><Link id="myLink" title="Click to do something" to={"/my-note"} onClick={this.props.displayTextMyNotes.bind(this)}>My Notes</Link></div>
            <div><Link className="centre-this" id="myLink" to={"/share-note"} onClick={this.props.displayTextSharedNotes.bind(this)}>Shared Notes</Link></div>

 
        </div>
    );
  }
}

export default LeftSideBar;
