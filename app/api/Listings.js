import client from "./client"

const getListings = () => client.get("/listings")

export default {
    getListings,
}