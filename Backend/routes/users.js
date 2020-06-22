const express = require("express");
const router = express.Router();
const { User } = require("../model/users")
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res.status(400).send({ error: "A user with the given email already exist" })
    }

    const userData = new User(req.body)

    userData.save((err, result) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send(result)
    })
  })
});

router.post("/expoPushToken", [auth], (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.status(200).send({ error: "Invalid user" })
    User.updateOne({ email: req.body.email }, { pushNotification: req.body.token }, (err, result) => {
      if (err) return res.status(400).send({ error: "something went wrong" })
      return res.status(200).send(result)
    })
  })
})

router.post("/getUser", (req, res) => {
  User.findOne({ _id: req.body.userId }, (err, data) => {
    if (err) return res.status(400).send({ error: "user does not exist" })
    return res.status(200).send(data)
  })
});

module.exports = router;
