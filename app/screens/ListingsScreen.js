import React from 'react';
import Screen from '../components/Screen';
import { FlatList, StyleSheet } from 'react-native';
import Card from '../components/Card';
import routes from "../navigation/Routes"

const listings = [
    {
        id: 1,
        title: "my artistic work",
        price: 100,
        image: require("../assets/profile.jpg")
    },
    {
        id: 2,
        title: "my artistic work 2",
        price: 1000,
        image: require("../assets/profile.jpg")
    },
    {
        id: 3,
        title: "my artistic work 3",
        price: 150,
        image: require("../assets/profile.jpg")
    },
]

function ListingsScreen({ navigation }) {
    return (
        <Screen style={styles.screen}>
            <FlatList
                data={listings}
                keyExtractor={list => list.id.toString()}
                renderItem={({ item }) =>
                    <Card
                        title={item.title}
                        image={item.image}
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
        backgroundColor: "#f8f4f4" // need to change
    }
})

export default ListingsScreen;