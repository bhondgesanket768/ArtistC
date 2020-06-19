import client from "./client"

const login = (email, password) => client.post("/auth", { email, password })

const register = (userInfo) => {
    const data = new FormData()
    data.append("name", userInfo.name)
    data.append("email", userInfo.email)
    data.append("phone", userInfo.phone)
    data.append("password", userInfo.password)

    data.append("profile", {
        name: "profile",
        type: "image/jpeg",
        uri: userInfo.profile
    })
    return client.post("/users/register", data)
}

const getUser = (userId) => {
    return client.post("/users/getUser", { userId })
}

export default {
    login,
    register,
    getUser
}