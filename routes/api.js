const express = require('express');
const router = express.Router();
const api = require('../controllers/api')

// currencies api
router.get('/:version/currencies', api.api);

module.exports = router;
