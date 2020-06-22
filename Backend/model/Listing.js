const mongoose = require("mongoose")
const Schema = mongoose.Schema

const listingSchema = new mongoose.Schema({
  title: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  images: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  categoryId: {
    type: Number
  },
  location: {
    type: new mongoose.Schema({
      latitude: { type: Number },
      longitude: { type: Number }
    })
  }
}, { timestamps: true });

const Listings = mongoose.model("Listings", listingSchema);

module.exports.Listings = Listings