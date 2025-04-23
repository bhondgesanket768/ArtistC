import client from "./client"

const getListings = () => client.get("/listings")

const postListings = (listing, onUploadProgress) =>  {
    return client.post("/listings", listing, {
        onUploadProgress: progress => onUploadProgress(progress.loaded / progress.total)
    })
}

const getUserListing = (userId) => {
    return client.post("/listings/userListing", { userId })
}

const removeItem = (itemId) => {
    return client.post("/listings/removeItem", { itemId })
}

export default {
    getListings,
    postListings,
    getUserListing,
    removeItem,
}
