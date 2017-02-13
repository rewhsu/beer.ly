'use strict';

const utils = require('../utils/helpers');
const config = require('../../config/apiKeys.js');

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

exports.get = (req, res) => {
  var user = req.params.user;
  return fetchDataByMethod(`user/info/${user}`)
  .then((response) => {
    console.log('USER INFO &&&&', response);
    res.send(JSON.stringify(response));
  })
  .catch(function(err) {
    console.error(err);
  })
};