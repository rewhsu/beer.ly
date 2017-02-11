'use strict';

const utils = require('../utils/helpers');
const config = require('../../config/apiKeys.js');
var axios = require('axios');

// const createUntappdAuthUrl = (api) => {
//   const clientId = '?client_id=' + api.client_id;

//   var newUrl = api.url + clientId + '&response_type=' + api.response_type + '&redirect_url=' + api.redirect_url;
//   console.log(newUrl);
//   return newUrl;
// }

// const fetchUntappdAuth = (api) => {
//   const url = createUntappdAuthUrl(api);
//   return axios.get(url)
//     .then((response) => {
//       console.log(response.headers['set-cookie']);
//       return response.data;
//     })
//     .catch((error) => {
//       return error;
//     });
// }

// function getToken() {
//   const api = {
//     client_id: config.untappdKey,
//     response_type: 'code',
//     redirect_url: 'https://localhost:8008/oauth2/callback',
//     url: 'https://untappd.com/oauth/authenticate/'
//   };
//   console.log('getting token');
//   return fetchUntappdAuth(api, {});
// }

// An example of how to use the UntappdClient.
//
// By Glen R. Goodwin
// twitter: @areinet

// Imports
var UntappdClient = require("node-untappd");
// Definitions

// Replace this with your CLIENT ID
var clientId = config.untappdKey;

// Replace this with your CLIENT SECRET
var clientSecret = config.untappdSecret;

// Set to true if you want to see all sort of nasty output on stdout.
var debug = false;

//The user we want to lookup for this example.
var lookupuser = "arei";

// Create Client
var untappd = new UntappdClient(debug);
untappd.setClientId(clientId);
untappd.setClientSecret(clientSecret);
module.exports = untappd;

var redirectUrl = 'https://localhost:8008/oauth2/callback';

var authUrl = untappd.getAuthenticationURL(redirectUrl);
var userAuthUrl = untappd.getAuthorizationURL(redirectUrl);
// var authorizationUrl = untappd.getAuthorizationURL(redirectUrl, code);
// axios.get(authUrl)
// .then((response) => {
//   console.log('userAuthUrl', userAuthUrl, 'authUrl', authUrl);
//   console.log('Token request sent', response);
// });

// untappd.userActivityFeed(function(err,obj){
//   if (debug) console.log(err,obj);
//   if (obj && obj.response && obj.response.checkins && obj.response.checkins.items) {
//     var beers = obj.response.checkins.items.forEach(function(checkin){
//       //console.log(checkin);
//       console.log("\n"+checkin.user.user_name,"drank",checkin.beer.beer_name);
//       console.log("by",checkin.brewery.brewery_name);
//       if (checkin.venue.venue_name) console.log("at",checkin.venue.venue_name);
//       console.log("on",checkin.created_at);
//     });
//   }
//   else {
//     console.log(err,obj);
//   }
// },lookupuser);