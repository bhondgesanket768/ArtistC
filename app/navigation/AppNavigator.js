import React, { useEffect } from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ListingEditScreen from "../screens/ListingEditScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import { Notifications } from "expo"
import * as Permissions from "expo-permissions"

const Tab = createBottomTabNavigator();
const AppNavigator = () => {

    useEffect(() => {
        registerPushNotification();
    }, [])

    const registerPushNotification = async () => {
        try {
            const permission = Permissions.askAsync(Permissions.NOTIFICATIONS)
            if (!permission.granted) return

            const token = await Notifications.getExpoPushTokenAsync()
            console.log(token)

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