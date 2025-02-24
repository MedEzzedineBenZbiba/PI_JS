const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const Employee = require("../models/Employee");

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const router = express.Router();
 
//const UserModel = require("../models/Employee"); // Import correct du modèle

router.post("/signup", async (req, res) => {
  try {
    console.log("Received signup request:", req.body); // Vérifier les données reçues

    const newUser = new Employee({
      cin: req.body.cin,
      name: req.body.name,
      familyName: req.body.familyName,
      birthday: req.body.birthday,
      gender: req.body.gender,
      phone: req.body.phone,
      role: req.body.role,
      email: req.body.email,
      password: req.body.password,
      joinDate: req.body.joinDate,
      adresse: req.body.adresse,
      status: req.body.status,
      qualifications: req.body.qualifications,
    });

    const savedUser = await newUser.save(); // Enregistrer l'utilisateur
    res.json({
      message: "Signup successful",
      user: savedUser,
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error during signup", error: error.message });
  }
});


router.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred. maybe the email doesn t exist or you should use the raw in postman with " " with the key');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
  
                return res.json({ token });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );


  passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

module.exports = router;
