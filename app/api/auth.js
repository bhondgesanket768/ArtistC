import client from "./client"

const login = (email, password) => client.post("/auth", { email, password })

const register = (userInfo) => client.post("/register", userInfo)

export default {
    login,
    register
}