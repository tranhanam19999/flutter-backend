const express = require('express');
const router = express.Router();
const action = require('../action/user');
const auth = require('../middleware/auth');

router.get('/', auth, action.getSingleMemory);
router.get('/list', auth, action.getListMemory)

module.exports = router;
