import client from "./client"

const register = (pushToken, email) => client.post("/users/expoPushToken", { token: pushToken, email: email })

export default {
    register
}