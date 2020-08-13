const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// @route   POST api/users
// @desc    Test route
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
  (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.mapped()})
    }
    console.log(req.body);
    res.send("Users route!");
  }
);

module.exports = router;
