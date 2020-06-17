import { AsyncStorage } from "react-native"
import moment from "moment"

const expiry = 5;

const store = async (key, value) => {
    try {
        const data = {
            value,
            timeStamp: Date.now()
        }
        await AsyncStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}

const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        const data = JSON.parse(value)

        if (!data) return null

        const time = moment(Date.now())
        const storedTime = moment(data.timeStamp)
        const isExpired = time.diff(storedTime, "minutes") > expiry

        if (isExpired) {
            await AsyncStorage.removeItem(key)
            return null
        }

        return data.value;

    } catch (error) {
        console.log(error)
    }
}

export default {
    store,
    get
}