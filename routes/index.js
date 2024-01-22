const express = require("express");
const router = express.Router();
const { login, verify } = require("../controllers/authenticate");
const { homePage } = require("../controllers/index");

/* Home Page API(API to just load the Homepgae) */
router.get("/", homePage);

/* Login API(API to send the OTP/OTP_URI to client) */
router.post("/login", login);

/* Verification API(API to verify the OTP received from the client) */
router.post("/otp-verify", verify);

module.exports = router;
