'use strict';

const router = require('express').Router();


const beers = require('./beers/beerRoutes');
const breweries = require('./breweries/breweryRoutes');
const locations = require('./locations/locationRoutes');
const beerInfo = require('./beerInfo/beerInfoRoutes');
const user = require('./user/userRoutes');


router.use('/beers', beers);
router.use('/breweries', breweries);
router.use('/locations', locations);
router.use('/beerInfo', beerInfo);
router.use('/user', user);

module.exports = router;