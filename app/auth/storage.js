import * as SecureStore from "expo-secure-store"

const key = "authToken"

const storeToken = async token => {
    try {
        await SecureStore.setItemAsync(key, token)
    } catch (error) {
        console.log("Error storing the auth token", error)
    }
}

const getToken = async () => {
    try {
        const token = await SecureStore.getItemAsync(key)
        return token
    } catch (error) {
        console.log("error in getting auth token", error)
    }
}

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key)
    } catch (error) {
        console.log("error in deleting the auth token", error)
    }
}

export default {
    storeToken,
    getToken,
    removeToken
}