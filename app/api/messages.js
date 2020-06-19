import client from "./client"

const send = (message, listingId, senderId) => {
    return client.post("/messages", { message, listingId, senderId })
}

const getMessages = (userId) => {
    return client.post("/messages/getMessage", { userId })
}

const deleteMessage = (messageId) => {
    return client.post("/messages/delete", { messageId })
}

const replayMessages = (message, listingId, senderId, toUser) => {
    return client.post("/messages/replay", { message, listingId, senderId, toUser })
}

export default {
    send,
    getMessages,
    deleteMessage,
    replayMessages
}