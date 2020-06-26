import React from "react"

import { createStackNavigator } from "@react-navigation/stack"
import MyAccountScreen from "../screens/MyAccountScreen"
import MessagesScreen from "../screens/MessagesScreen"
import MyListingScreen from "../screens/MyListingScreen"
import ReplyMessageScreen from "../screens/ReplyMessageScreen"
import ProfileEditScreen from "../screens/ProfileEditScreen"

const Stack = createStackNavigator()

const AccountNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "orange",
            },
        }}
    >
        <Stack.Screen name="Account" component={MyAccountScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="MyListings" component={MyListingScreen} />
        <Stack.Screen name="Replay" component={ReplyMessageScreen} />
        <Stack.Screen name="Profile" component={ProfileEditScreen} />
    </Stack.Navigator>
)

export default AccountNavigator