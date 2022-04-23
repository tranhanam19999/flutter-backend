const Memory = require("../../model/memory");
const constant = require("../../constant");

const createMemory = async (req, res) => {
  const memory = req.body;
  const user_id = memory.user_id;
  const newMemory = await Memory.findOne({ user_id });
  if (newMemory) {
    return res.status(400).json({ message: "err" });
  }
  const newMemory2 = await Memory.findOne({ partner_id: user_id });
  if (newMemory2) {
    return res.status(400).json({ message: "err" });
  }
  try {
    await Memory.create(memory);
    res.status(201).json({ message: "Created memory successfully!" });
  } catch (error) {
    res.status(400).json({ message: "err" });
  }
};

const updateMemory = async (req, res) => {
  const memory_id = req.params.memory_id;
  const newMemory = req.body;
  try {
    await Memory.findByIdAndUpdate(memory_id, newMemory);
    res.status(200).json({ message: "Memory updated successfully" });
  } catch (error) {
    res.status(404).json({ message: "error" });
  }
};

const getMemoryByUser = async (req, res) => {
  let user_id = req.params.user_id;
  try {
    let memory = await Memory.findOne({ user_id });
    if (!memory) {
      try {
        let memory_1 = await Memory.findOne({ partner_id: user_id });
        if (!memory_1) {
          return res
            .status(constant.respStatus.NOT_FOUND)
            .json({ message: "User not found1" });
        } else {
          return res.status(constant.respStatus.OK).json(memory_1);
        }
      } catch (error) {
        return res
          .status(constant.respStatus.NOT_FOUND)
          .json({ message: "User not found2" });
      }
    } else {
      return res.status(constant.respStatus.OK).json(memory);
    }
  } catch (error) {
    return res
      .status(constant.respStatus.NOT_FOUND)
      .json({ message: "User not found3" });
  }
};

module.exports = {
  getMemoryByUser,
  createMemory,
  updateMemory,
};
