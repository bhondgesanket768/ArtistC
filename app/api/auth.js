import client from "./client"

const login = (email, password) => client.post("/auth", { email, password })

const register = (userInfo) => {
    return client.post("/users/register", userInfo)
}

const getUser = (userId) => {
    return client.post("/users/getUser", { userId })
}

const deleteAccount = (userId) => {
    return client.post("/users/delete", { userId })
}

const updateAccount = (updateData) => {
    return client.post("/users/update", updateData)
}

export default {
    login,
    register,
    getUser,
    deleteAccount,
    updateAccount
}