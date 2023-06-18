const { Router } = require("express");
const router = Router();
const { loginUser } = require("../controllers/user.js");
const { uploadFile, upload } = require("../controllers/uploadFile.js");

const multer = require("multer");

router.route("/login").post(loginUser);

router.route("/upload-file").post(upload.single("file"), uploadFile);

module.exports = router;
