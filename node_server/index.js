const express = require('express');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
var cors = require('cors');

const ENV = path.resolve(".\\..\\.env");
if (fs.existsSync(ENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(ENV));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
} else {
  console.log(ENV);
  console.log("ENV file Not found");
}

const clientId = process.env.OKTA_CLIENT_ID;
const issuer = process.env.OKTA_ISSUER;
const okta = {
  url: "",
  token: "",
  client_id: "",
};


const app = express();"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: issuer,
  clientId: clientId,
  assertClaims: {
    aud: 'api://default',
  },
});

function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    return res.status(401).end();
  }

  const accessToken = match[1];
  const expectedAudience = 'api://default';

  return oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}

app.post("/addApplication", authenticationRequired, function (req, res) {

  console.log("Body :" + req.body);

  let app_name = "";
  let login_url = "";
  let logout_url = "";
  let initiate_login_url = "";

  //check name is empty or not
  if (req.body.app_name) {
    app_name = req.body.app_name;
  } else {
    res.send("name can't be empty");
  }

  // check login url is empty or not..
  if (req.body.login_url) {
    login_url = req.body.login_url;
  } else {
    res.send("Login URL can't be empty");
  }

  // check login url is empty or not..
  if (req.body.logout_url) {
    logout_url = req.body.logout_url;
  }

  if (req.body.initiate_login_url) {
    initiate_login_url = req.body.initiate_login_url;
  }

  var options = {
    method: "POST",
    url: `${okta.url}/api/v1/apps`,
    headers: {
      Authorization: `SSWS ${okta.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: {
      name: "oidc_client",
      label: app_name,
      signOnMode: "OPENID_CONNECT",
      credentials: {
        oauthClient: {
          autoKeyRotation: true,
          token_endpoint_auth_method: "client_secret_post",
        },
      },
      settings: {
        oauthClient: {
          client_uri: `${okta.url}/client`,
          redirect_uris: [login_url],
          post_logout_redirect_uris: [logout_url],
          initiate_login_uri: initiate_login_url,
          response_types: ["code"],
          grant_types: ["authorization_code"],
          application_type: "web",
        },
      },
    },
    json: true,
  };


  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });


    res.send("Successfully Submited. Please wait for OKTA Admin to respond.");
});



app.listen(8000, function () {
  console.log("Node server is running..");
});
