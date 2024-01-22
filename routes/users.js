const express = require("express");
const router = express.Router();
const { getUser, getAllUsers, addUser } = require("../controllers/users");
const { authenticate, authorize } = require("../middlewares/auth");
const { Roles } = require("../configs/constants");
const { All, User, Admin } = Roles;
/*
    Get the details of a specific User(Accessable to All(User + Admin))
    An API with Authentication & Role-based Autorization
*/
router.get("/:id", authenticate, authorize(All), getUser);

/*
    Get the list of all the Users(Accessable to Admin Only)
    An API with Authentication & Role-based Autorization
*/
router.get("/", authenticate, authorize(Admin), getAllUsers);

/*
    Add the dummy users to the DB(just for testing)
    An API 'Without' Authentication & Role-based Autorization
*/
router.post("/", addUser);

module.exports = router;
