
'use strict';

const router = require('express').Router();
const auth = require('./oAuthController');

const utils = require('../api/utils/helpers');
const config = require('../config/apiKeys.js');

router.route('/auth')
  .get(auth.redirectToAuth);

router.route('/callback')
  .get(auth.getToken);

module.exports = router;

