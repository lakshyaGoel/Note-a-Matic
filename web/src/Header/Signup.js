import React, { Component } from 'react';

class Signup extends Component {

  constructor(props) {
    super(props);

    this.isAuthenticated = this.props.isAuthenticated.bind(this);
    this.login = this.props.login.bind(this);
    this.logout = this.props.logout.bind(this);
  }

  isLoggedIn() {
    return this.isAuthenticated() && !!this.props.profile;
  }

  render() {

    const userDisplay = this.isLoggedIn()
      ? (
        <div className="navbar-item">
          <span>{this.props.profile.name}</span>
        </div>
      ) : null;

    const loginLogoutButton = this.isLoggedIn()
      ? (
        <button className="button" class="button is-link is-outlined" onClick={this.login}>
          Sign Up
        </button>
      ) : (
        <button className="button" class="button is-link is-outlined" onClick={this.login}>
          Sign Up
        </button>
      );
      

    return (
      <div className="navbar-end">
        {userDisplay}

        <div className="navbar-item">
          {loginLogoutButton}
        </div>
      </div>
    )
  }
}

export default Signup;
