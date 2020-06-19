import React from "react"

import { createStackNavigator } from "@react-navigation/stack"
import MyAccountScreen from "../screens/MyAccountScreen"
import MessagesScreen from "../screens/MessagesScreen"
import MyListingScreen from "../screens/MyListingScreen"
import ReplyMessageScreen from "../screens/ReplyMessageScreen"

const Stack = createStackNavigator()

const AccountNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Account" component={MyAccountScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="MyListings" component={MyListingScreen} />
        <Stack.Screen name="Replay" component={ReplyMessageScreen} />
    </Stack.Navigator>
)

export default AccountNavigator