const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "No profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/profile
// @desc    Create or update profile
// @access  Private

router.post(
  "/",
  [
    auth,
    [
      check("status").not().isEmpty().withMessage("Status is required"),
      check("skills").not().isEmpty().withMessage("Skills is required"),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Build profile social object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // create new profile

      profile = new Profile(profileFields);
      await profile.save();

      res.json(profile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Error message");
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]); // .populate(from, what)

    res.status(200).json(profiles);
  } catch (e) {
    console.log(e.message);
    res.send(500).send("Server Error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (e) {
    console.log(e.message);
    if (e.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.send(500).send("Server Error");
  }
});

// @route   DELETE api/profile/
// @desc    Delete profile, user & post
// @access  Private

router.delete("/user/:user_id", async (req, res) => {
  try {
    // @todo - remove user's posts

    // Remove profile
    await Profile.findByIdAndRemove({
      user: req.user.id,
    });

    // Remove user
    await User.findByIdAndRemove({
      _id: req.user.id,
    });

    res.json({ msg: "User deleted" });
  } catch (e) {
    console.log(e.message);
    if (e.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.send(500).send("Server Error");
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile's experience
// @access  Private

router.put(
  "/experience",
  [
    auth,
    [
      check("title").not().isEmpty().withMessage("Title is required"),
      check("company").not().isEmpty().withMessage("Company is required"),
      check("from").not().isEmpty().withMessage("From date is required"),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();

      res.json(profile)
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id})

    // Get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

    profile.experience.splice(removeIndex,1)

    await profile.save()
    res.json(profile)

  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   PUT api/profile/education
// @desc    Add profile's education
// @access  Private

router.put(
  "/education",
  [
    auth,
    [
      check("school").not().isEmpty().withMessage("School is required"),
      check("degree").not().isEmpty().withMessage("Degree is required"),
      check("fieldofstudy").not().isEmpty().withMessage("Field of study date is required"),
      check("from").not().isEmpty().withMessage("From date is required"),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();

      res.json(profile)
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id})

    // Get remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

    profile.education.splice(removeIndex,1)

    await profile.save()
    res.json(profile)

  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})


module.exports = router;
