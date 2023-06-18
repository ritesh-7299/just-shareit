const ResponseHandler = require("../handlers/responseHandler");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/user");
const { generateJWToken } = require("../config/webToken");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    ResponseHandler.sendValidationError(
      res,
      "please specify the required fields"
    );
  }
  const selectUser = await userModel.findOne({
    email: email,
  });

  if (selectUser) {
    if (await selectUser.matchPassword(password)) {
      ResponseHandler.sendSuccessResponse(res, {
        id: selectUser._id,
      });
    } else {
      ResponseHandler.sendValidationError(res, "Password is incorrect");
    }
  } else {
    ResponseHandler.sendValidationError(
      res,
      "No account found with this email"
    );
  }
});

module.exports = {
  loginUser,
};
