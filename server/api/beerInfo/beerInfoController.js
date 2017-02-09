'use strict';

const utils = require('../utils/helpers');
const config = require('../../config/apiKeys.js');

function fetchBeerInfoByBreweryId(beerID) {
  const api = {
    // key: config.breweryDBKey,
    // url: 'http://api.brewerydb.com/v2/',
    // endPoint: `brewery/${breweryID}/beers/`
    client_id: config.untappdKey,
    client_secret: config.untappdSecret,
    url: 'https://api.untappd.com/v4/',
    endPoint: `beer/info/${beerID}`
  };

  return utils.fetchUntappd(api, {});
}

exports.get = (req, res) => {
  const bid = req.params.bid;

  fetchBeerInfoByBreweryId(bid)
    .then((response) => {
      res.send(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error);
    });
};
