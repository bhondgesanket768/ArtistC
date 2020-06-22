const mongoose = require("mongoose")

const Schema = mongoose.Schema

const messageSchema = new mongoose.Schema({
    formUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    toUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    listingId: {
        type: Schema.Types.ObjectId,
        ref: "Listings"
    },
    content: {
        type: "string",
        require: true
    },
    senderName: {
        type: String,
        required: true
    },
    senderProfile: {
        type: String,
    }
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema)

module.exports.Message = Message

