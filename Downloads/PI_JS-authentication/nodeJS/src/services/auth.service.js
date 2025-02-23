// service/auth.service.js
const JWT = require("jsonwebtoken");
const User = require("../models/employee.model");

const crypto = require("crypto");
const bcrypt = require("bcrypt");

const signup = async (data) => {
  let user = await User.findOne({ email: data.email });
  if (user) {
    throw new Error("Email already exist");
  }
  user = new User(data);
  // Immediate Authentication
  const token = JWT.sign({ id: user._id }, "jwtSecret");
  await user.save();
  return (data = {
    userId: user._id,
    email: user.email,
    name: user.name,
  });
};

const login = async (data) => {
    let user = await User.findOne({ email: data.email });
    if (!user) {
      return ("Email doesn't exist");
    }
    const isValid = await bcrypt.compare(data.password, user.password);
    if(!isValid) return("wrong password");

    const token = JWT.sign({ id: user._id, tokenVersion: user.tokenVersion }, "jwtSecret");

    return (data = {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role, // Optionally include role for authorization
        token: token
    });
  };

module.exports = {
    signup, login
  };