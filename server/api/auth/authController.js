'use strict';

const utils = require('../utils/helpers');
const config = require('../../config/apiKeys.js');
var axios = require('axios');
var UntappdClient = require("node-untappd");

var clientId = config.untappdKey;
var clientSecret = config.untappdSecret;

// Set to true if you want to see all sort of nasty output on stdout.
var debug = false;

//The user we want to lookup for this example.
var lookupuser = "arei";

// Create Client
var Untappd = new UntappdClient(debug);
Untappd.setClientId(clientId);
Untappd.setClientSecret(clientSecret);
var redirectUrl = 'https://localhost:8008/oauth2/callback';


exports.redirectToAuth = function(req, res) {
  res.redirect(Untappd.getAuthenticationURL(redirectUrl));
}


exports.getToken = function(req, res) {
  var code = req.query.code;
  var message;
  axios.get(Untappd.getAuthorizationURL(redirectUrl, code))
  .then(function(response) {
    Untappd.setAccessToken(response.data.response.access_token);
  })
  .then(function() {
    if(Untappd.getAccessToken() !== undefined) {
      message = 'Access token received';
    } else {
      message = 'Access token failed';
    }
    res.send(message);
  })
}

var fetchDataByMethod = function(method) {
  method = method || 'user/info';
  const api = {
      client_id: config.untappdKey,
      url: 'https://api.untappd.com/v4/',
      method: method,
      token: Untappd.getAccessToken()
    };
  return utils.fetchUntappdAuth(api);
}

exports.getUserInfo = function(req, res) {
  return fetchDataByMethod('user/info')
  .then((response) => {
    return (JSON.stringify(response));
  })
  .catch(function(err) {
    console.error(err);
  })
}
