import React, { useState, useEffect } from 'react';
import Screen from '../components/Screen';
import { FlatList, StyleSheet } from 'react-native';
import Card from '../components/Card';
import routes from "../navigation/Routes"
import listingApi from "../api/Listings"
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ActivityIndicator from "../components/ActivityIndicator"
import useApi from '../hooks/useApi';

function ListingsScreen({ navigation }) {

    const { data: listings, error, loading, request: loadListings } = useApi(listingApi.getListings)

    useEffect(() => {
        loadListings()
    }, [])

    return (
        <Screen style={styles.screen}>
            {error &&
                <React.Fragment>
                    <AppText>Coulden't retrive the listing</AppText>
                    <AppButton title="Try again" onPress={loadListings} />
                </React.Fragment>
            }
            <ActivityIndicator visible={loading} />
            <FlatList
                data={listings}
                keyExtractor={list => list._id.toString()}
                renderItem={({ item }) =>
                    <Card
                        title={item.title}
                        imageUrl={item.images[0] && item.images[0].url}
                        subTitle={"$" + item.price}
                        onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                    />
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: "#f8f4f4"
    }
})

export default ListingsScreen;