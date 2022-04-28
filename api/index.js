const authRouter = require("./auth");
const chatRouter = require("./chat");
const userRouter = require("./user");
const memoryRouter = require("./memory");
const mottoRouter = require("./motto");
const eventRouter = require("./event");

module.exports = {
  authRouter,
  chatRouter,
  userRouter,
  memoryRouter,
  mottoRouter,
  eventRouter,
};
