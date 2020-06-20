import React, { useState, useEffect } from 'react';
import Screen from '../components/Screen';
import { FlatList, StyleSheet, RefreshControl, View } from 'react-native';
import Card from '../components/Card';
import routes from "../navigation/Routes"
import listingApi from "../api/Listings"
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ActivityIndicator from "../components/ActivityIndicator"
import useApi from '../hooks/useApi';

function ListingsScreen({ navigation }) {

    const { data: listings, error, loading, request: loadListings } = useApi(listingApi.getListings)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        loadListings()
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        loadListings()
        setRefreshing(false)
    }

    return (
        <React.Fragment>
            <ActivityIndicator visible={loading} />
            {!loading &&
                <Screen style={styles.screen}>
                    {error &&
                        <React.Fragment>
                            <AppText>Coulden't retrive the listing</AppText>
                            <AppButton title="Try again" onPress={loadListings} />
                        </React.Fragment>
                    }
                    {listings.length === 0 &&
                        <View style={styles.empty}>
                            <AppText style={styles.text}>Feed is Empty...</AppText>
                        </View>
                    }
                    <FlatList
                        data={listings}
                        keyExtractor={list => list._id.toString()}
                        renderItem={({ item }) =>
                            <Card
                                title={item.title}
                                imageUrl={item.images[0] && item.images[0].url}
                                subTitle={"$" + item.price}
                                onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                                thumbnailUrl={item.images[0].thumbnailUrl}
                            />
                        }
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                </Screen>
            }
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        paddingTop: 30,
        backgroundColor: "#f8f4f4"
    },
    empty: {
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
        marginLeft: 105
    },
    text: {
        fontSize: 24,
        fontWeight: "600"
    }
})

export default ListingsScreen;