const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Expo } = require("expo-server-sdk");

const sendPushNotification = require("../utilities/pushNotifications");
const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");
const { Listings } = require("../model/Listing")
const { User } = require("../model/users")
const { Message } = require("../model/messages")

const schema = {
  listingId: Joi.string().required(),
  message: Joi.string().required(),
  senderId: Joi.string().required()
};

router.post("/getMessage", auth, (req, res) => {

  Message.find({ toUser: req.body.userId }, (err, messages) => {
    if (err) return res.status(400).send(err)
    return res.status(200).send(messages)
  })
});

router.post("/", [auth, validateWith(schema)], async (req, res) => {

  const { listingId, message, senderId } = req.body;

  User.findOne({ _id: req.body.senderId }, (err, result) => {
    if (err) return res.status(400).send(err)

    const senderName = result.name
    const senderProfile = result.profile

    Listings.findOne({ _id: listingId }, (err, listing) => {
      if (err) return res.status(400).send(err)
      if (!listing) return res.status(400).send({ error: "bad request" })

      const targetUserId = listing.userId

      User.findOne({ _id: targetUserId }, (err, user) => {
        if (err) return res.status(400).send(err)
        if (!user) return res.status(400).send({ error: "User does not exist" })

        const targetUserPushToken = user.pushNotification

        const messageBody = {
          formUser: senderId,
          toUser: targetUserId,
          listingId: listingId,
          content: message,
          senderName: senderName,
          senderProfile: senderProfile
        }

        const msg = new Message(messageBody)

        msg.save(async (err, result) => {
          if (err) return res.status(400).send(err)

          if (Expo.isExpoPushToken(targetUserPushToken)) {
            await sendPushNotification(targetUserPushToken, message);
          }
          return res.status(200).send(result)
        })

      })
    })
  })
});

router.post("/delete", auth, (req, res) => {
  Message.findOneAndDelete({ _id: req.body.messageId }, (err, result) => {
    if (err) return res.status(400).send(err)
    return res.status(200).send(result)
  })
})

router.post("/replay", auth, (req, res) => {

  User.findOne({ _id: req.body.senderId }, (err, result) => {

    if (err) return res.status(400).send(err)

    const messageBody = {
      formUser: req.body.senderId,
      toUser: req.body.toUser,
      listingId: req.body.listingId,
      content: req.body.message,
      senderName: result.name,
      senderProfile: result.profile
    }

    const msg = new Message(messageBody)

    msg.save((err, result) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send(result)
    })
  })
})

module.exports = router;
