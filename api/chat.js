const express = require('express')
const action = require('../action/chat')
const router = express.Router()

router.get('/', action.createConnection);

module.exports = router
