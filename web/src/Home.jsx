import React, { useEffect, useState } from "react";

import { useOktaAuth } from "@okta/okta-react";

const Home = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
            <div className="container">
                <a className="navbar-brand" rel="home" href="#" title="OIDC">
                    <img src="https://inside.corp.adobe.com/etc.clientlibs/inside/fe/main/resources/logo.png" />
                </a>
            </div>
        </nav>
      </header>
      <main role="main" className="container">
        <h4 className="mt-3">Open ID Connect Application form</h4>
        <p className="lead">
          All New Okta applications created in Stage will require a final setup
          by an Okta Admin before use. An Okta Admin will be notified of your
          submission, and will notify you when your Okta application is ready
          for use
        </p>
      </main>
      <hr />
      <br />
      <form
        className="container"
        action="http://localhost:8000/api/messages"
        method="post"
      >
        <div className="form-group row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Application name*
          </label>
          <div className="col-sm-10">
            <input
              type="test"
              required
              name="app_name"
              className="form-control col-sm-6"
              id="inputEmail"
              placeholder="Application Name"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputLoginURL" className="col-sm-2 col-form-label">
            Login redirect URI*
          </label>
          <div className="col-sm-10">
            <input
              type="test"
              required
              name="login_url"
              className="form-control col-sm-6"
              id="inputLoginURL"
              placeholder="Enter login Redirect URI"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputLogoutURL" className="col-sm-2 col-form-label">
            Logout redirect URI
          </label>
          <div className="col-sm-10">
            <input
              type="test"
              name="logout_url"
              className="form-control col-sm-6"
              id="inputLogoutURL"
              placeholder="Enter logout Redirect URI"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputInitiateLoginURL" className="col-sm-2 col-form-label">
            Initiate login URI
          </label>
          <div className="col-sm-10">
            <input
              type="test"
              name="initiate_login_url"
              className="form-control col-sm-6"
              id="inputInitiateLoginURL"
              placeholder="Enter Initiate login URI"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-7" >
            <div className="col-xs-12 text-center">
              <div className="center-block" >
                <button href="#" className="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Home;
