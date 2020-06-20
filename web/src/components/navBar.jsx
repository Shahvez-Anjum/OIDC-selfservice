import React, { Component } from "react";

import { checkAuthentication } from "../utils/helpers";
import { withOktaAuth } from "@okta/okta-react";

export default withOktaAuth(
  class NavBar extends Component {
    constructor(props) {
      super(props);
      this.state = { userinfo: "", authenticated: null, value: null };
      this.checkAuthentication = checkAuthentication.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    async login() {
      this.props.authService.login('/');
    }
   
    async logout() {
      this.props.authService.logout('/');
    }

    handleChange = (e, { value }) => {
      if (value === "logout") {
        this.logout();
      } else {
        console.log(value);
      }
    };

    render() {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-brand-fixed">
            <img
              src="/logo.svg"
              width="50"
              height="50"
              className="adobe-top-logo hidden-xs pull-right"
              alt="Logo"
              title="Ops Er"
            />
          </div>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <div className="nav-link" title="OKTA-OIDC portal">
                OKTA-OIDC Self Service
                </div>
              </li>
            </ul>
            <div className="nav-link" id="navbar">
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item active">
              <a href="https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=entsec&title=OpenID+Connect+with+Okta"class="nav-item nav-link active">Help</a>
                 </li>
            </ul>
            </div>

            <span className="navbar-text">{this.state.userinfo.name}</span>
          </div>
        </nav>
      );
    }
  }
);
