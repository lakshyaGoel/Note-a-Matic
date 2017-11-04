import React, { Component } from 'react';

import { withAuth } from './Auth';
import { Route,BrowserRouter, Switch } from 'react-router-dom';

import LeftSideBar from './Components/LeftSideBar';
import Content from './Components/Content';
import RightSideBar from './Components/RightSideBar';
import Footer from './Components/Footer'
import Header from './Header';
import LoginLogout from './Header/LoginLogout';
import Signup from './Header/Signup';
import NewNote from './Components/NewNote';
import './Style.css';
//import Landing from './Components/landing';

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
    this.setState({displayText: 'User Details'})
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

              <BrowserRouter>
                <Switch>
                  
                  <Route exact path="/" children={() => <Content displayText={this.state.displayText} />} />
                  <Route path="/new" component={NewNote}/>>
                </Switch>
              </BrowserRouter>
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
          
          <div class="wrap">
            <div class="floatleft"></div>
            <div class="floatright">
              <center>   
                <h1 class="title is-1 title-color grey-darker">Notes Pro</h1>                
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