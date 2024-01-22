const User = require("../models/users");
const bcrypt = require("bcrypt");

/* This API method returns the details of a specific user */
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDetails = await User.findOne({ _id: id });
    const user = userDetails ? userDetails : {};

    return res.status(200).json({ data: { user } });
  } catch (error) {
    console.log("Error while fetching the details of the user : ", error);
    return res
      .status(500)
      .json({ message: "Failed to get the details of the user", error });
  }
};

/* This API method return the list of all the users from the DB */
const getAllUsers = async (req, res, next) => {
  try {
    const usersList = await User.find();
    const users = usersList ? usersList : [];

    return res.status(200).json({ data: { users } });
  } catch (error) {
    console.log("Error while fetching the List of the users : ", error);
    return res
      .status(500)
      .json({ message: "Failed to get the List of the users", error });
  }
};

/* This API method adds the new user to the DB */
const addUser = async (req, res, next) => {
  try {
    const userData = req.body;

    /* Hashing of password(plain) */
    const hashed_password = await bcrypt.hash(userData.password, 10);
    userData.password = hashed_password;
    /* Hashing of password(plain) */

    const userDetails = new User(userData);
    const userCreated = await userDetails.save();
    const user = userCreated ? userCreated : {};

    /* Removing the password before adding user data into in-memory DB */
    delete userData.password;
    /* Removing the password before adding user data into in-memory DB */

    await global.redis_client.set(`${user._id}`, JSON.stringify(userData));

    return res.status(201).json({ data: { test: "test" } });
  } catch (error) {
    console.log("Error while adding the user to the Database : ", error);
    return res
      .status(500)
      .json({ message: "Failed to add the user to the Database", error });
  }
};

module.exports = {
  addUser,
  getUser,
  getAllUsers,
};
