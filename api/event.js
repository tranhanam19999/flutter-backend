const express = require("express");
const router = express.Router();
const action = require("../action/event");

// router.get('/', auth, action.getSingleMemory);
// router.get('/list', auth, action.getListMemory)

router.post("/create-event", action.createEvent);
router.get("/:user_id", action.getEventByUser);
router.patch("/:event_id", action.updateEvent);

module.exports = router;
