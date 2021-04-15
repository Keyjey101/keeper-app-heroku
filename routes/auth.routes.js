require('dotenv').config()
const { Router } = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const router = Router();
const bcrypt = require("bcrypt");
const saltRounds = 12;
const jwt = require('jsonwebtoken')

//default    api/auth/register
router.post(
  "/register",
  [
    check("username", "bad email").isEmail(),
    check("password", "Minimum lenght is 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    
    try {
      const valitationErrors = validationResult(req);

      if (!valitationErrors.isEmpty()) {
        return res
          .status(400)
          .json({
            valitationErrors: valitationErrors.array(),
            message: "bad username and/or password",
          });
      }

      const { username, password } = req.body;


      //user existing check
      const isRegister = await User.findOne({ username });

      if (isRegister) {
        return res.status(400).json({ message: "User already exists" });
      }

      //creating hashed password based on userpass  CHECK IT
      const hashPass = await bcrypt.hash(password, saltRounds)
      const user = new User({
        username,
        password: hashPass,
      });
       
      // saving user in mongoose

      await user.save();

      res.status(201).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ message: "Something went *really wrong*, try again" });
    }
  }
);

//api/auth/login

router.post(
    "/login",
    [
      check("username", "bad email").isEmail(),
      check("password", "empty field").exists(),
    ],
    async (req, res) => {
      try {
        const valitationErrors = validationResult(req);
  
        if (!valitationErrors.isEmpty()) {
          return res
            .status(400)
            .json({
              valitationErrors: valitationErrors.array(),
              message: "bad username and/or password",
            });
        }
  

const {username, password} = req.body

const user = await User.findOne({username})


//user is existing check
if (!user){
    return res.status(400).json({ message: "Wrong username and/or password" })
}

//password check
const isMacth = await bcrypt.compare(password, user.password)

if (!isMacth){
    return res.status(400).json({ message: "Wrong username and/or password" })
}


const token = jwt.sign({userId: user.id}, process.env.JWTSECRET, {expiresIn: '1h'})

res.json({token, userId: user.id})







       
      } catch (error) {
        res.status(500).json({ message: "Something wrong, try again" });
      }
    }
  );






























// EXPORT
module.exports = router;
