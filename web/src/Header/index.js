import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoginLogout from './LoginLogout';
import img from '../landingImg.jpg'

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {disabled: false, textBoxVal: ""};
  }

  searchCall(){
    //console.log(document.getElementById('sfield').value);
    //this.setState({textBoxVal:document.getElementById('sfield').value});
    //this.props.setSearchValue.bind(this,this.state.textBoxVal);
    this.props.setSearchValue(document.getElementById('sfield').value);
  }

  render() {
    return (
      <nav className="navbar" style={{"backgroundColor": "hsl(0, 0%, 96%)"}}>
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
        <div className="navbar-end">
        <div className="SearchBox">
          <div>
            <input className="input" id="sfield" type="text" placeholder="e.g Note Title"/> 
          </div>&nbsp;
          <div>
            <Link to={'/search'}>
                <button className="button is-primary" onClick={this.searchCall.bind(this)}>Search</button>
            </Link>
          </div>
        </div>
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
                      <strong>Code Snippet Note</strong>
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
