var express = require('express');
var router = express.Router();
let users = require('../controllers/users')

/* user api, get apikey in response */
router.post('/:version/register', users.register);

module.exports = router;
