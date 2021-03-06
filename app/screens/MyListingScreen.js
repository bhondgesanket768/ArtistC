import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Alert, RefreshControl } from 'react-native';
import Card from '../components/Card';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import listingApi from "../api/Listings"
import useAuth from "../auth/useAuth"
import useApi from "../hooks/useApi"
import ActivityIndicator from "../components/ActivityIndicator"

function MyListingScreen({ route }) {

    const { user } = useAuth()

    const { data: listing, error, loading, request: getUserListing } = useApi(listingApi.getUserListing)

    const [refreshing, setRefreshing] = useState(false)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        let mounted = true
        if (mounted) getUserListing(user.userId)
        return () => mounted = false
    }, [toggle])

    const onRefresh = () => {
        setRefreshing(true)
        getUserListing(user.userId);
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
        <React.Fragment>
            <ActivityIndicator visible={loading} />
            <Screen style={styles.container}>
                {!loading && listing.length === 0 &&
                    <View style={styles.message}>
                        <AppText>Your Don't have any listings...</AppText>
                    </View>
                }
                <FlatList
                    data={listing}
                    keyExtractor={list => list._id.toString()}
                    renderItem={({ item }) =>
                        <Card
                            title={item.title}
                            imageUrl={item.images}
                            subTitle={"$" + item.price}
                            remove
                            onRemovePress={() => handleRemove(item)}
                        />
                    }
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            </Screen>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        backgroundColor: "#f8f4f4"
    },
    message: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default MyListingScreen;