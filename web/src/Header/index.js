import React, { Component } from 'react';

import LoginLogout from './LoginLogout';

class Header extends Component {

  render() {
    return (
      <nav className="navbar is-light">
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item title" href="/">5117 React Project Template</a>
          </div>

          <LoginLogout {...this.props} />
        </div>
      </nav>
    )
  }
  
}

export default Header;
