import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import { ListItems } from "../components/Lists"

function ListingDetailsScreen({ route }) {

    const listing = route.params
    return (
        <View>
            <Image style={styles.image} source={listing.image} />
            <View style={styles.container}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.price}>{listing.price}</AppText>
                <View style={styles.userContainer}>
                    <ListItems
                        image={require("../assets/profile.jpg")}
                        title="Sanket Bhondge"
                        subTitle="5 listings"
                        isChevron
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300
    },
    container: {
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
        marginBottom: 8
    },
    price: {
        color: "green",
        fontWeight: "bold",
        fontSize: 20,
    },
    userContainer: {
        marginVertical: 40
    }
})

export default ListingDetailsScreen;