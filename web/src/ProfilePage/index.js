import React, { Component } from 'react';

class ProfilePage extends Component {

  // to redirect if not logged in:
  // componentWillMount() {
  //   if (!this.props.isAuthenticated() || !!this.props.profile) {
  //     this.props.history.replace('/');
  //   }
  // }

  render() {

    let profileInfo = <div>not logged in</div>;
    if (this.props.profile) {
      profileInfo = (
        <div>
          <h2>{this.props.profile.name}</h2>
          <img src={this.props.profile.picture} alt="profile" />
          <pre>{JSON.stringify(this.props.profile, null, 2)}</pre>
        </div>
      );
    }

    return (
      <div className="profile-page">
        {profileInfo}
      </div>
    );
  }
}

export default ProfilePage;
