import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoginLogout from './LoginLogout';

class Header extends Component {

  render() {
    return (
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img
              src="https://lh3.googleusercontent.com/JfHCS7xbyFV6U85DMxT92rhND6i8v3XCUmI9A3uIwZGQk6AUFZ445uz9J0vWh5P4XKU=w300"
              alt="Notes Pro"
              width="40"
              height="40"/>
            Notes Pro
          </a>
        </div>
        <div className="navbar-end">
          <div id="navMenuTransparentExample" className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">Add A Note</div>
                <div id="moreDropdown" className="navbar-dropdown is-boxed">
                  <Link to={'/new/'} className="navbar-item">
                    <p>
                      <strong>Text Note</strong>
                      <br/>
                      <small>Add some text to save</small>
                    </p>
                  </Link>
                  <hr className="navbar-divider"/>
                  <Link to={'/new/'} className="navbar-item ">
                    <p>
                      <strong>Code Note</strong>
                      <br/>
                      <small>Add some code to save</small>
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="control">
            <LoginLogout {...this.props}/>
          </p>
        </div>
      </nav>
    )
  }

}

export default Header;
