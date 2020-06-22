const express = require("express");
const router = express.Router();

const { Listings } = require("../model/Listing")

router.get("/", (req, res) => {
  Listings.find((err, result) => {
    if (err) return res.send(err)
    return res.send(result)
  })
})

router.post(
  "/",
  async (req, res) => {

    const listing = {
      title: req.body.title,
      userId: req.body.userId,
      price: parseFloat(req.body.price),
      categoryId: parseInt(req.body.categoryId),
      description: req.body.description,
      images: req.body.image
    };
    if (req.body.location) listing.location = JSON.parse(req.body.location);
    if (req.user) listing.userId = req.user.userId;

    const listings = new Listings(listing)

    listings.save((err, result) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send(result)
    })
  }
);


router.post("/userListing", (req, res) => {
  Listings.find({ userId: req.body.userId }, (err, data) => {
    if (err) return res.status(400).send(err)
    return res.status(200).send(data)
  })
})

router.post("/removeItem", (req, res) => {
  Listings.findOneAndDelete({ _id: req.body.itemId }, (err, result) => {
    if (err) return res.status(400).send(err)
    return res.status(200).send(result)
  })
})


module.exports = router;

