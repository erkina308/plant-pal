const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./usersRouter");
const plantsRouter = require("./plantsRouter");

apiRouter.use("/users", usersRouter);
apiRouter.use("/plants", plantsRouter);

module.exports = apiRouter;
