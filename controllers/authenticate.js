const User = require("../models/users");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const bcrypt = require("bcrypt");

/* 
  This API method is used to do the basic authentication
  and sends the OTP/OTP_URI to the client using speakeasy
*/
const login = async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    const userDetails = await User.findOne({ _id: userId });
    if (!userDetails) return res.status(500).json({ error: "Invalid User" });

    /* Password Comparison */
    const hashed_password = userDetails.password;
    const valid_user = bcrypt.compare(password, hashed_password);
    if (!valid_user)
      return res.status(401).json({ error: "Invalid userId/password" });
    /* Password Comparison */

    const rawData = await global.redis_client.get(userId);
    const userData = JSON.parse(rawData);

    /* Creation of OTP/OTP_URI */
    const secret = speakeasy.generateSecret({ length: 20 });
    const code = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
    });
    const OTP_URI = await QRCode.toDataURL(secret.otpauth_url);
    /* Creation of OTP/OTP_URI */

    userData.secret = secret.base32,
    userData.verified = false,
    userDetails.secret = secret.base32;

    await User.updateOne({ _id: userId }, userDetails);
    await global.redis_client.set(userId, JSON.stringify(userData));

    return res.status(200).json({ otp: code, OTP_URI });
  } catch (error) {
    console.log("Error while doing login : ", error);
    return res.status(500).json({ error });
  }
};

/* 
  This API method is used to complete the authentication 
  proccess by verifying the token/OTP using speakeasy
*/
const verify = async (req, res, next) => {
  try {
    let secret;
    const { userId, otp: token, OTP_URI } = req.body;
    const rawData = await global.redis_client.get(userId);
    const userData = JSON.parse(rawData);

    if (userData.secret) {
      secret = userData.secret;
    } else {
      const userDetails = await User.findOne({ _id: id });
      secret = userDetails.secret.base32;
    }

    const tokenValidated = speakeasy.totp.verify({
      token,
      secret,
      window: 1,
      encoding: "base32",
    });

    if (tokenValidated) {
      userData.verified = true;
      await global.redis_client.set(userId, JSON.stringify(userData));
    }
    return res.status(200).json({ verified: tokenValidated });
  } catch (error) {
    console.log("Error while verifying the token(OTP) : ", error);
    return res.status(500).json({ error });
  }
};

module.exports = {
  login,
  verify,
};
