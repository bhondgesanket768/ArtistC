const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const validateWith = require("../middleware/validation");
const { User } = require("../model/users")
const config = require("config")

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.post("/", validateWith(schema), (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.status(400).send({ error: "Invalid email or password" })

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.status(400).send({ error: "Wrong password" })

      const token = jwt.sign(
        { userId: user._id, name: user.name, email: user.email },
        config.get("key")
      );
      return res.status(200).send(token);
    })
  })
});

module.exports = router;
