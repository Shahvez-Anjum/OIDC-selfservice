/* eslint-disable import/no-extraneous-dependencies */

// Support storing environment variables in a file named ".env"
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
// Read environment variables from ".env". Override environment vars if they are already set.
const ENV = path.resolve(".\\..\\.env");
if (fs.existsSync(ENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(ENV));
  Object.keys(envConfig).forEach(k => {
    process.env[k] = envConfig[k];
  });
} else {
  console.log(ENV);
  console.log("ENV file Not found");
}

process.env.OKTA_ISSUER = process.env.OKTA_ISSUER;
process.env.OKTA_CLIENT_ID = process.env.OKTA_CLIENT_ID;
process.env.OKTA_REDIRECT_URI = process.env.OKTA_REDIRECT_URI;
process.env.APP_PORT = process.env.APP_PORT;
process.env.APP_ENV = process.env.APP_ENV;
process.env.SERVER_URL = process.env.SERVER_URL;

const webpack = require("webpack");

const env = {};

// List of environment variables made available to the app
[
  "OKTA_ISSUER",
  "OKTA_CLIENT_ID",
  "OKTA_REDIRECT_URI",
  "APP_PORT",
  "APP_ENV",
  "SERVER_URL"
].forEach(key => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} must be set. See README.md`);
  }
  env[key] = JSON.stringify(process.env[key]);
});
console.log(env);
module.exports = {
  /* eslint-disable no-param-reassign */
  webpack: config => {
    // Remove the 'ModuleScopePlugin' which keeps us from requiring outside the src/ dir
    config.resolve.plugins = [];

    // Define global vars from env vars (process.env has already been defined)
    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        "process.env": env
      })
    ]);
    return config;
  }
};
