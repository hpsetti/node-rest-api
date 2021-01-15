const express = require("express");
const router = express.Router();


const UserController = require("../../controllers/users");

const jwt = require("jsonwebtoken");
const tokenVerify = require("../../middleware/tokenVerify");


// Sign-up route
router.post("/signup", UserController.user_signup)

// Log-in route
router.post("/login", UserController.user_login)

router.delete("/:userId",tokenVerify, UserController.user_delete)

module.exports = router;