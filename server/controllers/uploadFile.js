const asyncHandler = require("express-async-handler");
const ResponseHandler = require("../handlers/responseHandler");
const multer = require("multer");
const path = require("path");
const uploadModel = require("../models/upload");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

const uploadFile = asyncHandler(async (req, res) => {
  const image = req.file.filename;
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const path = baseUrl + "/images/" + image;
  uploadModel
    .create({ image: image })
    .then(() => {
      ResponseHandler.sendSuccessResponse(res, {
        path: path,
      });
    })
    .catch(() => {
      ResponseHandler.sendErrorResponse(res, "Data not stored!");
    });
});

module.exports = { uploadFile, upload };
