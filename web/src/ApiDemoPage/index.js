import React from 'react';

import ProtectedCall from './ProtectedCall';
import UnprotectedCall from './UnprotectedCall';

const getUserId = (profile) => !profile ? '(not logged in)' : profile.sub;

export default ({profile, getAuthorizationHeader}) => (
  <div>
    <p>
      See express logs for info about the user.
      Current user id is: <code>{getUserId(profile)}</code>
    </p>

    <div className="content">
      <UnprotectedCall />
    </div>

    <div className="content">
      <ProtectedCall getAuthorizationHeader={getAuthorizationHeader}/>
    </div>
    
  </div>
)
