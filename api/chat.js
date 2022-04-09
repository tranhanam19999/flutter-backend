const express = require('express')
const action = require('../action/chat')
const router = express.Router()

router.get('/', action.getChatMessage);
router.post("/", action.createChatMessage);

module.exports = router
