const axios = require('axios');

// Helper function for creating url with query string and api key
const createUrl = (api, queryOptions) => {
  const key = '?key=' + api.key;

  const queryStrings = [];

  // Create query string from all query options
  for (const query in queryOptions) {
    if (typeof queryOptions[query] === 'string') {
      // encode spaces for url if query option is string
      queryStrings.push(query + '=' + queryOptions[query].replace(' ', '+'));
    } else {
      queryStrings.push(query + '=' + queryOptions[query]);
    }
  }

  return api.url + api.endPoint + key + '&' + queryStrings.join('&');
};

const createUntappdUrl = (api, queryOptions) => {
  const clientId = '?client_id=' + api.client_id;
  const clientSecret = '&client_secret=' + api.client_secret;

  const queryStrings = [];

   // Create query string from all query options
  for (const query in queryOptions) {
    if (typeof queryOptions[query] === 'string') {
      // encode spaces for url if query option is string
      queryStrings.push(query + '=' + queryOptions[query].replace(' ', '+'));
    } else {
      queryStrings.push(query + '=' + queryOptions[query]);
    }
  }

  return api.url + api.endPoint + clientId + clientSecret + '&' + queryStrings.join('&');
}

exports.fetch = (api, queryOptions) => {
  const url = createUrl(api, queryOptions);
  return axios.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

exports.fetchUntappd = (api, queryOptions) => {
  const url = createUntappdUrl(api, queryOptions);
  return axios.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}
