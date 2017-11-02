import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import { withAuth } from './Auth';

import LeftSideBar from './Components/LeftSideBar';
import Content from './Components/Content';
import RightSideBar from './Components/RightSideBar';
import Footer from './Components/Footer'
import Header from './Header';

class App extends Component {

  render() {

    // this.props has a bunch of stuff in it related to auth0 (from `withAuth` below)
    console.log('props', this.props);

    return (
      <div className="App">

        <Header {...this.props} />
          <div className="ContentArea">
              <div style={{"display":"table-row"}}>
                  <LeftSideBar />
                  <Content />
                  <RightSideBar/>
              </div>
          </div>
        <Footer />

      </div>
    );
  }
}

export default withAuth(App);
