import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Screen from '../components/Screen';
import Card from "../components/Card"


function SellerListing({ route }) {

    const listing = route.params

    return (
        <Screen style={styles.container}>
            <FlatList
                data={listing}
                keyExtractor={list => list._id.toString()}
                renderItem={({ item }) =>
                    <Card
                        title={item.title}
                        imageUrl={item.images[0].url}
                        subTitle={"$" + item.price}
                        thumbnailUrl={item.images[0].thumbnailUrl}
                    />
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f8f4f4"
    }
});

export default SellerListing;