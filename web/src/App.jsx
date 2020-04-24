import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Home from './Home';
import React from 'react';
import config from './config';

const App = () => (
  <Router>
    <Security {...config.oidc}>
      <SecureRoute path="/" exact component={Home} />
      <Route path="/implicit/callback" component={LoginCallback} />
    </Security>
  </Router>
);
export default App;
