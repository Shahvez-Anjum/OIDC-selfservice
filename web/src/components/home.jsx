import React, { Component } from "react";

import axios from "axios";
import config from "../utils/config";
import { withOktaAuth } from "@okta/okta-react";

export default withOktaAuth(
  class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        accessToken: "",
        app_name: "",
        login_url: "",
        logout_url: "",
        initiate_login_url: "",
      };
    }

    async componentDidMount() {
      this.state.accessToken = this.props.authState.accessToken;
    }

    onChange = (e) => {
      /*
        Because we named the inputs to match their
        corresponding values in state, it's
        super easy to update the state
      */
      this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
      // e.preventDefault();
      // get our form data out of state
      const params = {
        app_name: this.state.app_name,
        login_url: this.state.login_url,
        logout_url: this.state.logout_url,
        initiate_login_url: this.state.initiate_login_url,
      };

      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.state.accessToken}`,
        },
      };
      axios
        .post(`${config.resourceServer}addApplication`, params, options)
        .then((result) => {
          console.log(result);
          alert(result.data);
        });
    };


    render() {
      const {
        app_name,
        login_url,
        logout_url,
        initiate_login_url,
      } = this.state;

      return (
        <React.Fragment >
          <div>
            <main role="main" className="authDialog">
              <h4 className="mt-3">OpenID Connect Application form</h4>
              <p className="authDialog">
                All New Okta applications created in Prod/Prev/Stage will require a final
                setup by an Okta Admin before use. An Okta Admin will be
                notified of your submission, and will notify you when your Okta
                application is ready for use.
                </p>
            </main>
            <hr />
            <br />
            <form onSubmit={this.onSubmit}>
              <div className="form-group row">
                <label htmlFor="app_name" className="col-sm-2 col-form-label">
                  Application name
                  <abbr class="text-danger">*</abbr>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    required
                    name="app_name"
                    className="form-control col-sm-6"
                    id="app_name"
                    placeholder="Name of the app for OKTA"
                    value={app_name}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="login_url" className="col-sm-2 col-form-label">
                  Login redirect URI
                  <abbr class="text-danger">*</abbr>
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control col-sm-6"
                    type="url"
                    required
                    name="login_url"
                    id="login_url"
                    placeholder="Callback URI (where the authorization code should be sent)"
                    value={login_url}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="logout_url" className="col-sm-2 col-form-label">
                  Logout redirect URI
                </label>
                <div className="col-sm-10">
                  <input
                    type="url"
                    name="logout_url"
                    className="form-control col-sm-6"
                    id="logout_url"
                    placeholder="https://"
                    value={logout_url}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="initiate_login_url"
                  className="col-sm-2 col-form-label">
                  Initiate login URI
                </label>
                <div className="col-sm-10">
                  <input
                    type="url"
                    name="initiate_login_url"
                    className="form-control col-sm-6"
                    id="initiate_login_url"
                    placeholder="https://"
                    value={initiate_login_url}
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label class="col-sm-2 col-form-label" for="env">Application Type<abbr class="text-danger">*</abbr></label>
                <div class="col-sm-10">
                  <select required name="apptype" class="form-control col-sm-6">
                    {/* <option value="? undefined:undefined ?"></option> */}
                    <option> Select</option>
                    <option value="Web">Web</option>
                    <option value="spa">Single page app</option>
                  </select>
                </div>



                <label class="col-sm-2 col-form-label" for="env">Environment<abbr class="text-danger">*</abbr></label>
                <div class="col-sm-10">
                  <select required name="env" class="form-control col-sm-6">
                    {/* <option value="? undefined:undefined ?"></option> */}
                    <option> Select</option>
                    <option value="stage">Stage</option>
                    <option value="preview">Preview</option>
                    <option value="Prod">Prod</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10">
                  <div className="col-xs-12 text-center">
                    <div className="col-md-offset-2 col-md-10">
                      <button type="submit" className="btn btn-success">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </React.Fragment >
      );
    }
  }
);

