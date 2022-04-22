const express = require('express');
const router = express.Router();
const action = require('../action/user');
const auth = require('../middleware/auth');

router.get('/', auth, action.getUserById);
router.get('/list', action.getAllUsers);
router.put('/active', auth, action.activeUser)
router.put('/deactive', auth, action.deactiveUser)
router.get("/partner", action.getPartner);
router.get("/user-without-partner", action.getUserWithoutPartner)
router.put("/verify-partner", action.verifyPartner)

module.exports = router;
