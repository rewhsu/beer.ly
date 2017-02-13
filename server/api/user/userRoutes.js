'use strict';

const router = require('express').Router();
const user = require('./userController');

router.route('/')
  .get(user.get);

router.route('/:user')
  .get(user.getUserInfo);

module.exports = router;

