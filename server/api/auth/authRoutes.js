'use strict';

const router = require('express').Router();
const untappd = require('./authController');

const utils = require('../utils/helpers');
const config = require('../../config/apiKeys.js');
var qs = require('query-string');

var clientId = config.untappdKey; // Replace this with your CLIENT ID
var clientSecret = config.untappdSecret; // Replace this with your CLIENT SECRET
var redirectUrl = 'https://localhost:8008/oauth2/callback';

var axios = require('axios');

router.get('/user', function(req, res) {
  console.log('myauthenticationurl', untappd.getAuthenticationURL(redirectUrl));
  res.redirect(untappd.getAuthenticationURL(redirectUrl));
}); 

var user;
var token;
var lookupuser = "arei";
var result;

router.get('/callback', function(req, res) {
  console.log('REQ PARAMS', req.query.code);
  // console.log('CB REQUEST*****', req);
  console.log('untappd object', untappd);
  var code = req.query.code;
  console.log('CODE', code);
  var redirectUrl = 'https://localhost:8008/oauth2/callback';
  axios.get(untappd.getAuthorizationURL(redirectUrl, code))
  .then(function(response) {
    console.log('TOKEN RESPONSE???', response)
    console.log('TOKEN', response.data.response.access_token);
    untappd.setAccessToken(response.data.response.access_token);
  })
  .then(function() {
    var method = 'user/info'
    return getData(method);
  })
  .then(function(data) {
    console.log('DAATA', data);
    res.send(data);
  });

  function getData(method) {
    var url = `https://api.untappd.com/v4/${method}?access_token=${untappd.getAccessToken()}`
    axios.get(url)
    .then(function(response) {
      console.log('**************', response.data.response.user);
      user = response.data.response.user;
    })
    .catch(function(err) {
      console.error(err);
    })  
    return user;
  }
  //     untappd.userActivityFeed(function(err,obj){
  //       // if (debug) console.log(err,obj);
  //       if (obj && obj.response && obj.response.checkins && obj.response.checkins.items) {
  //         var beers = obj.response.checkins.items.forEach(function(checkin){
  //           //console.log(checkin);
  //           console.log("\n"+checkin.user.user_name,"drank",checkin.beer.beer_name);
  //           console.log("by",checkin.brewery.brewery_name);
  //           if (checkin.venue.venue_name) console.log("at",checkin.venue.venue_name);
  //           console.log("on",checkin.created_at);
  //         });
  //       }
  //       else {
  //         console.log(err,obj);
  //       }
  //     },lookupuser);
  // });
});

// var getToken = function(authUrl) {
//   // axios.get(authUrl)
//   //   .then(function(response) {
//   //     console.log('TOKEN???', response)
//   //     console.log('%*^^TOKEN', response.data.response.access_token);
//   //     var token = response.data.response.access_token;
//   //     untappd.setAccessToken(token);
//   //     console.log('mytoken', untappd.getAccessToken())
//   //     res.send(response.data.response.access_token);
//   //   })
//   //   .then(function() {
//   //     userActivityFeed();
//   //   })
// }

// var userActivityFeed = function() {
//   untappd.activityFeed(function(err,obj){
//     var beers = obj.results.forEach(function(checkin){
//         console.log("\n"+username,"drank",checkin.beer_name);
//         console.log("by",checkin.brewery_name);
//         if (checkin.venue_name) console.log("at",checkin.venue_name);
//         console.log("on",checkin.created_at);
//     });
// },lookupuser);
// }



module.exports = router;

