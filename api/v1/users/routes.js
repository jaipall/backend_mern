const express = require("express");
const userRouter = express.Router();
userRouter.get("/", getUserDetailsController);
module.exports = { userRouter };
