const {
  signUpController,
  loginController,
  forgetPasswordController,
  resetPasswordController,
 
} = require("../controllers/auth.controller");





const Employee = require("../models/employee.model");
const bcrypt = require("bcrypt");

const router = require("express").Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/forget-password", forgetPasswordController);
router.post("/reset-password", resetPasswordController);






module.exports = router;
