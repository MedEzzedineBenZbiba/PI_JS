// controllers/auth.controller.js
const User = require("../models/employee.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
    signup,
    login
  } = require("../services/auth.service");
  
  const signUpController = async (req, res, next) => {
    try {
        const signupService = await signup(req.body);
        return res.json(signupService);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


const loginController = async (req, res, next) => {
    try {
        const loginService = await login(req.body);
        return res.json(loginService);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


const forgetPasswordController = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });
  
      // Générer le token de réinitialisation
      const configDb = require("../config/db.json");
      const resetToken = jwt.sign({ id: user._id }, configDb.jwt.secret, { expiresIn: "15m" });
  
      user.resetToken = resetToken;
      await user.save();
  
      // Vérifier que l'email et le mot de passe SMTP sont bien configurés
      if (!configDb.email || !configDb.email.user || !configDb.email.pass) {
        return res.status(500).json({ message: "Configuration de l'email incorrecte" });
      }
  
      //  Configurer le transporteur SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: configDb.email.user,
          pass: configDb.email.pass,
        },
      });
  
      const mailOptions = {
        from: configDb.email.user,
        to: user.email,
        subject: "Réinitialisation du mot de passe",
        text: `Utilisez ce lien pour réinitialiser votre mot de passe: ${configDb.email.clientUrl}/reset/${resetToken}`,
      };
  
      // Envoyer l'email
      await transporter.sendMail(mailOptions);
  
      res.json({ message: "E-mail de réinitialisation envoyé" });
    } catch (err) {
      console.error("Erreur lors de l'envoi de l'e-mail :", err); // Loguer l'erreur
      res.status(500).json({ error: err.message });
    }
  };
  
  
  //  Réinitialisation du mot de passe avec le Token
  const resetPasswordController = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      const configDb = require("../config/db.json");
      const decoded = jwt.verify(token, configDb.jwt.secret);
      const user = await User.findById(decoded.id);
  
      if (!user || user.resetToken !== token) {
        return res.status(400).json({ message: "Token invalide" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword, resetToken: "" } });
  
      res.json({ message: "Mot de passe mis à jour" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  



  module.exports = {
    signUpController,
    loginController,
    forgetPasswordController,
    resetPasswordController,
    

};