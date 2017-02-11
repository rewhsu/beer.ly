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

exports.Untappd = Untappd;

exports.tokenSequence = function() {
  return axios.get(exports.redirectToAuth)
  .then(function() {
    exports.getToken();
    console.log('TOKEN SEQUENCE', Untappd.getAccessToken());
    return;
  })
  .then(function(response) {
     return Untappd.getAccessToken();
  })
  .catch(function(err) {
    console.error(err);
  });
}

// exports.hasToken = function() {
//   if (Untappd.getAccessToken() === undefined) {
//     return false;
//   } else {
//     return true;
//   }
// }


exports.redirectToAuth = function(req, res) {
  res.redirect(Untappd.getAuthenticationURL(redirectUrl));
}


exports.getToken = function(req, res) {
  var code = req.query.code;
  var message;
  axios.get(Untappd.getAuthorizationURL(redirectUrl, code))
  .then(function(response) {
    Untappd.setAccessToken(response.data.response.access_token);
    return response.data.response.access_token;
  })
  .then(function(token) {
    process.env.ACCESS_TOKEN = token;
    console.log('ACCESS_TOKEN', process.env.ACCESS_TOKEN);
    // if(Untappd.getAccessToken() !== undefined) {
    //   message = 'Access token received';
    // } else {
    //   message = 'Access token failed';
    // }
    // res.send(message);
    // res.redirect('https://localhost:8008');
    res.send(token);
  })
}

var fetchDataByMethod = function(method) {
  method = method || 'user/info';
  const api = {
      client_id: config.untappdKey,
      url: 'https://api.untappd.com/v4/',
      method: method,
      token: process.env.ACCESS_TOKEN
    };
  return utils.fetchUntappdAuth(api);
}

exports.getUserInfo = function(req, res) {
  var user = req.params.user;
  return fetchDataByMethod(`user/info/${user}`)
  .then((response) => {
    console.log(response);
    return (JSON.stringify(response));
  })
  .catch(function(err) {
    console.error(err);
  })
}
