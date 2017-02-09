'use strict';

const utils = require('../utils/helpers');
const config = require('../../config/apiKeys.js');

function fetchBreweryByName(name) {
  const api = {
    client_id: config.untappdKey,
    client_secret: config.untappdSecret,
    // url: 'http://api.brewerydb.com/v2/',
    // endPoint: 'breweries/'
    url: 'https://api.untappd.com/v4/',
    endPoint: 'search/brewery'
  };

  const queryOptions = {
    q: name
    // name: name
  };

  return utils.fetchUntappd(api, queryOptions);
}

function fetchBeersByBreweryId(breweryID) {
  const api = {
    // key: config.breweryDBKey,
    // url: 'http://api.brewerydb.com/v2/',
    // endPoint: `brewery/${breweryID}/beers/`
    client_id: config.untappdKey,
    client_secret: config.untappdSecret,
    url: 'https://api.untappd.com/v4/',
    endPoint: `brewery/info/${breweryID}`
  };

  return utils.fetchUntappd(api, {});
}

exports.get = (req, res) => {
  const name = req.params.brewery;

  fetchBreweryByName(name)
    .then((response) => {
      const breweryID = response.response.brewery.items[0].brewery.brewery_id;
      return fetchBeersByBreweryId(breweryID);
    })
    .then((response) => {
      res.end(JSON.stringify(response.response.brewery.beer_list.items));
    })
    .catch((error) => {
      console.log(error);
    });
};
