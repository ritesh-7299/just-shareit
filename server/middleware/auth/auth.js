const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");
const asyncHandler = require("express-async-handler");
const ResponseHandler = require("../../handlers/responseHandler");

const authorizer = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decode token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await userModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, "Unauthorized!");
    }
  }

  if (!token) {
    ResponseHandler.sendErrorResponse(res, "Token not provided!");
  }
});

module.exports = { authorizer };
