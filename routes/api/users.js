const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
const User = require("./../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must have as least 6 chacaracters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: { msg: "User email already registered" } });
      }

      const avatar = await gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const salt = await bcrypt.genSalt();

      const userPassword = await bcrypt.hash(password, salt);

      user = new User({ name, password: userPassword, email, avatar });
      await user.save();
      // Return jwt
      const payload = {
        user: {
          id: user.id,
        },
      };
      // jwt.sign (payload, jwtsecret, opts, callback(err, token))
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
