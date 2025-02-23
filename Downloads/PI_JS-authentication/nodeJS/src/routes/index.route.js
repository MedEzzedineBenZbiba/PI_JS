const {
  signUpController,
  loginController,
  forgetPassword,
  resetPassword,
  getAllUsers

} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth/auth");
const Employee = require("../models/employee.model");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.get("/users", getAllUsers);
router.get("/profile", authMiddleware, (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

router.delete(
  "/deleteEmployees/:id",
  authMiddleware,
  async (req, res, next) => {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.send("employees has been deleted");
  }
);

router.put('/editEmployee/:id', authMiddleware, async (req, res, next) => {
    try {
        const { email, phone, oldPassword, newPassword } = req.body;
        const _id = req.params.id;

        const employee = await Employee.findById(_id);
        if (!employee) {
            return res.status(404).json({ error: "User not found" });
        }
    

        // Update email and phone if provided
        if (email) employee.email = email;
        if (phone) employee.phone = phone;

        // If user wants to change the password
        if (oldPassword && newPassword) {
            // Get the latest stored hashed password from DB
            const latestEmployee = await Employee.findById(_id);
            
            // Compare the old password with the **latest** stored hashed password
            const isMatch = await bcrypt.compare(oldPassword, latestEmployee.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Old password is incorrect" });
            }

             // Let the "pre-save" middleware handle hashing
            employee.password = newPassword;
        }

        await employee.save();
        res.json({ message: "User updated successfully", employee });
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;
