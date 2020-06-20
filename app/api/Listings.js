import client from "./client"

const getListings = () => client.get("/listings")

const postListings = (listing, onUploadProgress) => {

    const data = new FormData()
    data.append("title", listing.title)
    data.append("userId", listing.userId)
    data.append("price", listing.price)
    data.append("categoryId", listing.category.value)
    data.append("description", listing.description)

    listing.images.forEach((image, index) => data.append("images", {
        name: "image" + index,
        type: "image/jpeg",
        uri: image
    }))

    if (listing.location) {
        data.append("location", JSON.stringify(listing.location))
    }

    return client.post("/listings", data, {
        onUploadProgress: progress => onUploadProgress(progress.loaded / progress.total)
    })
}

const getUserListing = (userId) => {
    return client.post("/listings/userListing", { userId })
}

const removeItem = (itemId, imageId) => {
    return client.post("/listings/removeItem", { itemId, imageId })
}

export default {
    getListings,
    postListings,
    getUserListing,
    removeItem
}