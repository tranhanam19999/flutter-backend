const express = require('express')
const action = require('../action/auth')
const router = express.Router()

router.get('/', action.getIndex)
router.post('/sign-in', action.signIn)
router.post('/sign-up', action.signUp)

module.exports = router
