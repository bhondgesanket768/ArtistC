import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ListingEditScreen from "../screens/ListingEditScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator();
const AppNavigator = () => (
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

export default AppNavigator