require("dotenv").config();
const userRoutes = require("./routes/user.js");
const cors = require("cors");

module.exports = function () {
  const app = require("express")();
  app.use(
    cors({
      origin: [`${process.env.CLIENT_URL}`],
    })
  );
  //attaching routes
  app.use("/user", userRoutes);

  return app;
};
