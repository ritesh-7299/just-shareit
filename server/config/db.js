const { connect } = require("mongoose");

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

//connection to mongodb function
const connectDB = async () => {
  const connection = await connect(process.env.MONGO_URI, options);

  return connection;
};

module.exports = connectDB;
