const express = require("express")
const action = require("../action/motto")
const router = express.Router()

router.get("/list", action.getListMotto)

module.exports = router
