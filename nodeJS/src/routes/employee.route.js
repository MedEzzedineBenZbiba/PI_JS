const User = require("../models/employee.model");
const { profileController} = require("../controllers/profile.controller")
const authMiddleware = require("../middlewares/auth/auth");
const router = require("express").Router();


router.get("/profile", authMiddleware, profileController );


module.exports = router;