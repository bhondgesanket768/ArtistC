import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import { ListItems } from "../components/Lists"

function ListingDetailsScreen(props) {
    return (
        <View>
            <Image style={styles.image} source={require("../assets/background.jpg")} />
            <View style={styles.container}>
                <AppText style={styles.title}>Sketch for sale</AppText>
                <AppText style={styles.price}>$100</AppText>
                <View style={styles.userContainer}>
                    <ListItems
                        image={require("../assets/profile.jpg")}
                        title="Sanket Bhondge"
                        subTitle="5 listings"
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