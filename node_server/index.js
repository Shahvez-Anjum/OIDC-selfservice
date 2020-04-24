var express = require('express');
var http = require("https");
var request = require("request");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/messages', function (req, res) {

    let app_name = '';
    let login_url = '';
    let logout_url = '';
    let initiate_login_url = '';

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

    const okta = {
        url: '',
        token: '',
        client_id: '',
    }

    var options = {
        method: 'POST',
        url: `${okta.url}/api/v1/apps`,
        headers:
        {
            Authorization: `SSWS ${okta.token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body:
        {
            name: 'oidc_client',
            label: app_name,
            signOnMode: 'OPENID_CONNECT',
            credentials:
            {
                oauthClient:
                {
                    
                    autoKeyRotation: true,
                    token_endpoint_auth_method: 'client_secret_post'
                }
            },
            settings:
            {
                oauthClient:
                {
                    client_uri: `${okta.url}/client`,
                    redirect_uris: [login_url],
                    post_logout_redirect_uris: [logout_url],
                    initiate_login_uri: initiate_login_url,
                    response_types: ['token', 'id_token', 'code'],
                    grant_types: ['implicit', 'authorization_code'],
                    application_type: 'web'
                }
            }
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });

    res.send("successfully submited");
});

app.listen(8000, function () {
    console.log('Node server is running..');
});