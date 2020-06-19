import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Alert, RefreshControl } from 'react-native';
import Card from '../components/Card';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import listingApi from "../api/Listings"
import useAuth from "../auth/useAuth"

function MyListingScreen({ route }) {

    const { user } = useAuth()

    const [listing, setUserListing] = useState([]);
    const [refreshing, setRefreshing] = useState(false)
    const [toggle, setToggle] = useState(false)

    const getUserListing = async () => {
        const result = await listingApi.getUserListing(user.userId)
        if (!result.ok) return;
        setUserListing(result.data)
    }

    useEffect(() => {
        getUserListing()
    }, [toggle])

    const onRefresh = () => {
        setRefreshing(true)
        getUserListing();
        setRefreshing(false)
    }

    const removeitem = async (item) => {
        const result = await listingApi.removeItem(item._id);
        if (!result.ok) return
        setToggle(!toggle)
        Alert.alert("Success", "Your posting Deleted successfully", [
            { text: "Ok" }
        ])
    }

    const handleRemove = (item) => {
        Alert.alert("Delete", "Are you sure, This will remove your posting ?", [
            { text: "Yes", onPress: () => removeitem(item) },
            { text: "No" }
        ])
    }

    return (
        <Screen style={styles.container}>
            {listing.length > 0 ? (
                <FlatList
                    data={listing}
                    keyExtractor={list => list._id.toString()}
                    renderItem={({ item }) =>
                        <Card
                            title={item.title}
                            imageUrl={item.images[0].url}
                            subTitle={"$" + item.price}
                            thumbnailUrl={item.images[0].thumbnailUrl}
                            remove
                            onPress={() => handleRemove(item)}
                        />
                    }
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            ) : (
                    <View style={styles.message}>
                        <AppText>Your Don't have any listings...</AppText>
                    </View>

                )}

        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f8f4f4"
    },
    message: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default MyListingScreen;