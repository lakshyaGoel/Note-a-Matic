import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'

import auth0 from 'auth0-js';

/**
 * Auth0 configuration.  See /web/.env and /web/.env.development
 */
const auth0config = new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,

  // must match with API identifier in auth0
  audience: process.env.REACT_APP_AUTH0_API_ID,
  responseType: 'token id_token',

  // scope matches with auth0 scopes
  scope: 'openid profile read:messages'
});

/**
 * Auth0 authentication methods.
 *
 * Wraps a component to inject auth0 methods as props.
 *
 * @see docs: https://reactjs.org/docs/higher-order-components.html
 * @see https://auth0.com/docs/quickstart/spa/react/01-login
 */
function withAuth(WrappedComponent) {

  class ComponentWithAuth extends Component {

    constructor(props) {
      super(props);
      this.state = {profile: this._getProfile()};

      this.auth0 = auth0config;

      this.isAuthenticated = this.isAuthenticated.bind(this);
      this._handleAuthentication = this._handleAuthentication.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }

    login() {
      this.auth0.authorize();
    }

    /**
     * Store authResult for future access throughtout the app.
     * Invoked by /callback route.
     */
    _handleAuthentication() {
      this.auth0.parseHash((err, authResult) => {
        if (err || !authResult || !authResult.accessToken || !authResult.idToken) {
          throw new Error('auth0 error', err, authResult);
        }

        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);

        this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
          if (err || !profile) {
            throw new Error('error fetching auth0 profile', err, profile);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          this.props.history.replace('/');

          this.setState({
            'profile': profile
          });
        });

      });
    }

    _getProfile() {
      let profile = localStorage.getItem('profile');
      return (!profile) ? null : JSON.parse(profile);
    }

    logout() {
      // Clear access token and ID token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('profile');
      // navigate to the home route
      this.props.history.replace('/');

      this.setState({
        'profile': null
      });
    }

    isAuthenticated() {
      // Check whether the current time is past the
      // access token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    /**
     * returns an {Authorization: Bearer token} object for use in a fetch header.
     * returns an empty object if not logged in.
     */
    getAuthorizationHeader() {
      const token = localStorage.getItem('access_token');
      return !token ? {} : {
        'Authorization': `Bearer ${token}`
      };
    }

    render() {
      return (
        <div>
          <WrappedComponent
            isAuthenticated={this.isAuthenticated}
            login={this.login}
            logout={this.logout}
            getAuthorizationHeader={this.getAuthorizationHeader}
            profile={this.state.profile}
            />

          <Route path="/callback" render={(props) => {
            this._handleAuthentication(props)
            return <div>loading...</div>
          }}/>
        </div>
      );
    }
  };

  // withRouter allows this component to use this.props.history
  // https://reacttraining.com/react-router/web/api/withRouter
  return withRouter(ComponentWithAuth);
}

export { withAuth };
