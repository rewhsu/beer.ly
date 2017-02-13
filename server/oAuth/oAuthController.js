'use strict';

const utils = require('../api/utils/helpers');
const config = require('../config/apiKeys.js');
var axios = require('axios');
var UntappdClient = require("node-untappd");

var clientId = config.untappdKey;
var clientSecret = config.untappdSecret;

// Set to true if you want to see all sort of nasty output on stdout.
var debug = false;

//The user we want to lookup for this example.
// var lookupuser = "arei";

// Create Client
var Untappd = new UntappdClient(debug);
Untappd.setClientId(clientId);
Untappd.setClientSecret(clientSecret);
var redirectUrl = 'https://localhost:5000/oauth2/callback';

exports.Untappd = Untappd;

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
    // res.send(token);
    res.redirect('https://localhost:5000');
  })
}