const { Router } = require("express");
const router = Router();
const { loginUser } = require("../controllers/user.js");

router.route("/login").post(loginUser);

module.exports = router;
