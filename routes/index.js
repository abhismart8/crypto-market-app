var express = require('express');
var router = express.Router();
let index = require('../controllers/index')

/* GET home page. */
router.get('/', index.index);

router.post('/get-data', index.getData);

module.exports = router;
