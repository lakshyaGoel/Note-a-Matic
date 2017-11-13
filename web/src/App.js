import React, { Component } from 'react';

import { withAuth } from './Auth';
import { Route, Switch } from 'react-router-dom';

import LeftSideBar from './Components/LeftSideBar';

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
import TagSearch from './TagSearch/index.js';

import Search from './Search';

import {getAuthorizationHeader} from "./functions";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        displayText: 'All Notes', displayTag: ' ', val: ""
    };
    this.displayTextUser = this.displayTextUser.bind(this);
    this.displayTextAllNotes = this.displayTextAllNotes.bind(this);
    this.displayTextMyNotes = this.displayTextMyNotes.bind(this);
    this.displayTextSharedNotes = this.displayTextSharedNotes.bind(this);
    this.displayTagValue=this.displayTagValue.bind(this);
    this.setval=this.setval.bind(this);
  }
  // functions called when each link in the leftpanel is clicked
  displayTextUser(){
    this.setState({displayText: 'User Details'});
    
  }
  displayTextAllNotes(){
    this.setState({displayText: 'All Notes'});
    
  }
  displayTextMyNotes(){
    this.setState({displayText: 'My Notes'});
 
  }
  displayTextSharedNotes(){
    this.setState({displayText: 'Shared Notes'});

  }
  displayTagValue(value){
    
    this.setState({displayTag: value});
    
  }

  //search function
  setval(value){
    //console.log("The value passed to App.js is : "+value);
    this.setState({val : value});
  }

  // send User profile data to server. to save user data to our own User database
  componentDidMount(){
    let request = new Request('/api/db/user-info', {
      method: 'POST',
      headers: {
        "Authorization": getAuthorizationHeader().Authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.props.profile),
    });

    fetch(request).then(response => {return response;});
  }

  render() {

    // this.props has a bunch of stuff in it related to auth0 (from `withAuth` below)
    //console.log('props', this.props);

    if(this.props.profile){
      /**
       * add functionality to add user profile data to the User database.
       * if there is no user data same as props.profile, then add user data,
       * else do not do anything.
       *
       * I think we should try auth0's database instead of our db. but... its hard for us.
       *
       * anyway, save data here.
       */
      // console.log("confirm profile: ",this.props.profile);
      return (
        <div className="App">
  
          <Header {...this.props}  setSearchValue={this.setval}/>
            <div className="ContentArea" id="contentArea">
              <div style={{"display":"flex"}}>
              <LeftSideBar {...this.props} displayTextUser={this.displayTextUser} displayTextAllNotes={this.displayTextAllNotes} displayTextMyNotes={this.displayTextMyNotes} displayTextSharedNotes={this.displayTextSharedNotes} displayTagValue1={this.displayTagValue}/>

                <div className="ShowCase">
                <Switch>
                  <Route exact path="/" children={() => <AllNote profile={this.props.profile}/>} />
                  <Route path="/search"  children={() => <Search value={this.state.val} profile={this.props.profile}/>}/>
                  <Route path="/new/:type" component={NewNote}/>
                  <Route path="/:type/:noteId" component={NewNote}/>
                  <Route path="/user-info" children={() => <UserInfo {...this.props}/>}/>
                  <Route path="/all-note"  children={() => <AllNote profile={this.props.profile} currentSelectedTag={this.state.displayTag}/>}/>
                  <Route path="/my-note"  children={() => <MyNote profile={this.props.profile}/>}/>
                  <Route path="/share-note"  children={() => <ShareNote profile={this.props.profile}/>}/>
                  <Route path="/tag-search"  children={() => <TagSearch profile={this.props.profile} currentSelectedTag={this.state.displayTag}/>}/>
                </Switch>
                </div>
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
                <h1 className="title is-1 title-color grey-darker">Notes</h1>
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