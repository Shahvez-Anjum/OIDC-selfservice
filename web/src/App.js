import "./App.css";

import { ImplicitCallback, SecureRoute, Security } from "@okta/okta-react";

import Footer from "./components/footer";
import Home from "./components/home";
import NavBar from "./components/navBar";
import React from "react";
import { Route } from "react-router-dom";
import config from "./utils/config";

function App() {
  return (
    <Security {...config.oidc}>
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <SecureRoute path="/" exact component={Home} />
        </main>
        <Footer />
      </React.Fragment>
    </Security>
  );
}

export default App;
