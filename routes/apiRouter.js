const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./usersRouter");
const plantsRouter = require("./plantsRouter");
//const uploadsRouter = require("./uploadsRouter");

apiRouter.use("/users", usersRouter);
apiRouter.use("/plants", plantsRouter);
//apiRouter.use("/uploads", uploadsRouter);

module.exports = apiRouter;
