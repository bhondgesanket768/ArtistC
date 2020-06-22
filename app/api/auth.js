import client from "./client"

const login = (email, password) => client.post("/auth", { email, password })

const register = (userInfo) => {
    return client.post("/users/register", userInfo)
}

const getUser = (userId) => {
    return client.post("/users/getUser", { userId })
}

export default {
    login,
    register,
    getUser
}