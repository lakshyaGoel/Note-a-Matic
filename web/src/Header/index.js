import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoginLogout from './LoginLogout';
import img from '../landingImg.jpg'

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {disabled: false};
  }
  render() {
    return (
      <nav className="navbar" style={{"background-color": "hsl(0, 0%, 96%)"}}>
        <div className="navbar-brand">
          <a className="navbar-item navBarLink" href="/">
            <img
              src={img}
              alt="Notes"
              width="70"
              height="70"/>
            Notes
          </a>
        </div>
        <div>
          <input class="input" id="sfield" type="text" placeholder="e.g Alex Smith"/> 
        </div>&nbsp;
        <div>
          <Link to={'/search'}>
              <button class="button is-primary" onClick>Search</button>
          </Link>
        </div>
        <div className="navbar-end">
          <div id="navMenuTransparentExample" className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item has-dropdown is-hoverable customButtonClass" id="dropDownMenu">
                <div className="navbar-link">Add A Note</div>
                <div id="moreDropdown" className="navbar-dropdown is-boxed">
                  <Link to={'/new/Text'} className="navbar-item">
                    <p>
                      <strong>Text Note</strong>
                      <br/>
                      <small>Add some text to save</small>
                    </p>
                  </Link>
                  <hr className="navbar-divider"/>
                  <Link to={'/new/Code'} className="navbar-item ">
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

          <div className="control">
            <LoginLogout {...this.props}/>
          </div>
        </div>
      </nav>
    )
  }

}

export default Header;
