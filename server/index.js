const server = require("./socket.js");
const connectDB = require("./config/db.js");

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("database connection successfull!");
    server().listen(port, () => {
      console.log("listening on port:", port);
    });
  })
  .catch((error) => {
    console.log("Database connection failed...", error);
  });
