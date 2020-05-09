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
          {/* <div className="navbar-brand">
            <img
              src="/OpsErLogo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
              title="Ops Er"
            />
          </div> */}
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <div className="nav-link" to="#" title="OKTA-OIDC portal">
                OKTA-OIDC
                </div>
              </li>
            </ul>
            <span className="navbar-text">{this.state.userinfo.name}</span>
          </div>
        </nav>
      );
    }
  }
);
