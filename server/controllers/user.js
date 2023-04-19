const ResponseHandler = require("../handlers/responseHandler");

const loginUser = (req, res) => {
  ResponseHandler.sendSuccessResponse(res, {
    message: "User Logged in successfully.",
  });
};

module.exports = {
  loginUser,
};
