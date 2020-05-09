import "./App.css";

import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Footer from "./components/footer";
import Home from "./components/home";
import NavBar from "./components/navBar";
import config from "./utils/config";

class App extends Component {
  render() {
    return (
      <Router>
        <Security {...config.oidc}>
          <NavBar />
          <main className="container">
            <SecureRoute path="/" exact component={Home} />
          </main>
          <Route path="/implicit/callback" component={LoginCallback} />
          <Footer />
        </Security>
      </Router>
    );
  }
}

export default App;
