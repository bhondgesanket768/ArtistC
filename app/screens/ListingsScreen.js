import React from 'react';
import Screen from '../components/Screen';
import { FlatList, StyleSheet } from 'react-native';
import Card from '../components/Card';

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
]

function ListingsScreen(props) {
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
                    />
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: "grey" // need to change
    }
})

export default ListingsScreen;