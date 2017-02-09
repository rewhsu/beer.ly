'use strict';

const router = require('express').Router();
const beerInfo = require('./beerInfoController');

router.route('/:bid')
  .get(beerInfo.get);

module.exports = router;
