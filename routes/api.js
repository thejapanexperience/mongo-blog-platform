const express = require('express');
const router = express.Router();

router.use('/boards', require('./boards'))
router.use('/chosenboards', require('./chosenboards'))

module.exports = router;
