import { useEffect } from "react"
import useAuth from "../auth/useAuth";
import { Notifications } from "expo"
import * as Permissions from "expo-permissions"
import pushTokenApi from "../api/expoPushToken"

export default useNotifications = (notificationListerner) => {
    const { user } = useAuth()

    useEffect(() => {
        registerPushNotification();
        if (notificationListerner) {
            Notifications.addListener(notificationListerner)
        }
    }, [])

    const registerPushNotification = async () => {
        try {
            const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            if (!permission.granted) return

            const token = await Notifications.getExpoPushTokenAsync()
            pushTokenApi.register(token, user.email)

        } catch (error) {
            console.log("error in getting push token", error)
        }
    }
}