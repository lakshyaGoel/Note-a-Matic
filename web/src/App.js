import React, { Component } from 'react';

import { withAuth } from './Auth';
import { Route, Switch } from 'react-router-dom';

import LeftSideBar from './Components/LeftSideBar';

import RightSideBar from './Components/RightSideBar';
import Footer from './Components/Footer'
import Header from './Header';
import LoginLogout from './Header/LoginLogout';
import Signup from './Header/Signup';
import NewNote from './Components/NewNote';
import './Style.css';
//import Landing from './Components/landing';

import UserInfo from './UserInfo/index.js';
import AllNote from './AllNote/index.js';
import MyNote from './MyNote/index.js';
import ShareNote from './ShareNote/index.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        displayText: 'All Notes'
    };
    this.displayTextUser = this.displayTextUser.bind(this);
    this.displayTextAllNotes = this.displayTextAllNotes.bind(this);
    this.displayTextMyNotes = this.displayTextMyNotes.bind(this);
    this.displayTextSharedNotes = this.displayTextSharedNotes.bind(this);
  }
  // functions called when each link in the leftpanel is clicked
  displayTextUser(){
    this.setState({displayText: 'User Details'});
    console.log("helloUser");
    console.log(this.state.displayText);
  }
  displayTextAllNotes(){
    this.setState({displayText: 'All Notes'});
    console.log("helloAllNotes");
  }
  displayTextMyNotes(){
    this.setState({displayText: 'My Notes'});
    console.log("helloMyNotes");
  }
  displayTextSharedNotes(){
    this.setState({displayText: 'Shared Notes'});
    console.log("helloSharedNotes");
  }


  render() {

    // this.props has a bunch of stuff in it related to auth0 (from `withAuth` below)
    //console.log('props', this.props);

    if(this.props.profile){
      return (
        <div className="App">
  
          <Header {...this.props} />
            <div className="ContentArea" id="contentArea">
              <div style={{"display":"table-row"}}>
              <LeftSideBar {...this.props} displayTextUser={this.displayTextUser} displayTextAllNotes={this.displayTextAllNotes} displayTextMyNotes={this.displayTextMyNotes} displayTextSharedNotes={this.displayTextSharedNotes}/>


                <Switch>
                  <Route exact path="/" children={() => <AllNote />} />
                  <Route path="/new/:type" component={NewNote}/>
                  <Route path="/user-info" children={() => <UserInfo {...this.props}/>}/>
                  <Route path="/all-note" component={AllNote}/>
                  <Route path="/my-note" component={MyNote}/>
                  <Route path="/share-note" component={ShareNote}/>
                </Switch>
              <RightSideBar/>
              </div>
            </div>
          <Footer />
  
        </div>
      );
    }
    else
    {
      
      return (
        <div>
          
          <div className="wrap">
            <div className="floatleft"></div>
            <div className="floatright">
              <center>   
                <h1 className="title is-1 title-color grey-darker">Notes Pro</h1>
                <LoginLogout {...this.props} />
                <Signup {...this.props} />
              </center>
            </div>
            
        </div>      
        </div>);
    }    
    
  }
}

export default withAuth(App);