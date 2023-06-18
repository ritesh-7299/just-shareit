require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.js");

module.exports = function () {
  const app = express();
  app.use(
    cors({
      origin: [`${process.env.CLIENT_URL}`],
    })
  );
  app.use(express.json());

  app.use("/images", express.static("images"));

  //attaching routes
  app.use("/user", userRoutes);

  return app;
};
