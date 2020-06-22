import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import ListingsScreen from "../screens/ListingsScreen"
import ListingDetailsScreen from "../screens/ListingDetailsScreen"
import SellerListing from "../screens/SellerListing"
import { View, Image, StyleSheet } from "react-native"
import AppText from "../components/AppText"

const Stack = createStackNavigator()

const Header = () => {
    return (
        <View style={styles.header}>
            <Image style={{ width: 30, height: 30 }} source={require("../assets/logo.png")} />
            <AppText style={styles.text}>ArtistC</AppText>
        </View>
    )
}

const FeedNavigator = () => (
    <Stack.Navigator mode="modal" >
        <Stack.Screen name="Listings" component={ListingsScreen} options={{ headerTitle: props => <Header {...props} /> }} />
        <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
        <Stack.Screen name="SellerListing" component={SellerListing} />
    </Stack.Navigator>
)

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        flex: 1
    },
    text: {
        fontSize: 24,
        paddingLeft: 15
    }
})

export default FeedNavigator