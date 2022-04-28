const Event = require("../../model/event");
const constant = require("../../constant");

const createEvent = async (req, res) => {
  const event = req.body;
  const user_id = event.user_id;
  const newEvent = await Event.findOne({ user_id });
  if (newEvent) {
    return res.status(400).json({ message: "err" });
  }
  const newEvent2 = await Event.findOne({ partner_id: user_id });
  if (newEvent2) {
    return res.status(400).json({ message: "err" });
  }
  try {
    await Event.create(event);
    res.status(201).json({ message: "Created event successfully!" });
  } catch (error) {
    res.status(400).json({ message: "err" });
  }
};

const updateEvent = async (req, res) => {
  const event_id = req.params.event_id;
  const newEvent = req.body;
  try {
    const current_event = await Event.findById(event_id);
    const events = current_event.events.push(newEvent);
    const newEvents = {
      ...current_event,
      events,
    };
    try {
      await Event.findByIdAndUpdate(event_id, newEvents);
      res.status(200).json({ message: "Memory updated successfully" });
    } catch (error) {
      res.status(404).json({ message: "error1" });
    }
  } catch (error) {
    res.status(404).json({ message: "error" });
  }
};

const getEventByUser = async (req, res) => {
  let user_id = req.params.user_id;
  try {
    let event = await Event.findOne({ user_id });
    if (!event) {
      try {
        let event_1 = await Event.findOne({ partner_id: user_id });
        if (!event_1) {
          return res
            .status(constant.respStatus.NOT_FOUND)
            .json({ message: "User not found1" });
        } else {
          return res.status(constant.respStatus.OK).json(event_1);
        }
      } catch (error) {
        return res
          .status(constant.respStatus.NOT_FOUND)
          .json({ message: "User not found2" });
      }
    } else {
      return res.status(constant.respStatus.OK).json(event);
    }
  } catch (error) {
    return res
      .status(constant.respStatus.NOT_FOUND)
      .json({ message: "User not found3" });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  getEventByUser,
};
