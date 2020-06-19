import React, { useEffect } from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ListingEditScreen from "../screens/ListingEditScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import { Notifications } from "expo"
import * as Permissions from "expo-permissions"
import pushTokenApi from "../api/expoPushToken"
import useAuth from "../auth/useAuth";
import navigation from "../navigation/RootNavigation"

const Tab = createBottomTabNavigator();
const AppNavigator = () => {

    const { user } = useAuth()

    useEffect(() => {
        registerPushNotification();
        Notifications.addListener(notifcation => {
            navigation.navigate("Account")
        })
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

    return (
        <Tab.Navigator>
            <Tab.Screen name="Feeds" component={FeedNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="home" size={size} color={color} />
                }}
            />
            <Tab.Screen name="ListingEdit" component={ListingEditScreen}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
                }}
            />
            <Tab.Screen name="Account" component={AccountNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="account" size={size} color={color} />
                }}
            />
        </Tab.Navigator>
    )
}

export default AppNavigator