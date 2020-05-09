const serverURL = process.env.SERVER_URL;

export default {
  oidc: {
    clientId: process.env.OKTA_CLIENT_ID,
    issuer: process.env.OKTA_ISSUER,
    redirectUri: process.env.OKTA_REDIRECT_URI,
    scopes: ["openid", "profile", "email"],
    pkce: true
  },
  resourceServer: serverURL
};
