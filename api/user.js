const express = require('express');
const router = express.Router();
const action = require('../action/user');
const auth = require('../middleware/auth');

router.get('/', auth, action.getUserById);
router.get('/list', auth, action.getAllUsers);
router.put('/active', auth, action.activeUser)
router.put('/deactive', auth, action.deactiveUser)

module.exports = router;
