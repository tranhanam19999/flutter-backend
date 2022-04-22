const express = require("express");
const router = express.Router();
const action = require("../action/memory");
const auth = require("../middleware/auth");

// router.get('/', auth, action.getSingleMemory);
// router.get('/list', auth, action.getListMemory)

router.post("/create-memory", action.createMemory);
router.get("/:user_id", action.getMemoryByUser);
router.patch("/:memory_id", action.updateMemory);

module.exports = router;
