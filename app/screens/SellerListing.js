import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import Card from "../components/Card"
import { useNavigation } from '@react-navigation/native';
import routes from "../navigation/Routes"

function SellerListing({ route }) {

    const listing = route.params
    const [list, setList] = useState(listing.reverse())
    const navigation = useNavigation()

    useEffect(() => {
        setList(listing.reverse());
    }, [])

    return (
        <Screen style={styles.container}>
            <FlatList
                data={list}
                keyExtractor={list => list._id.toString()}
                renderItem={({ item }) =>
                    <Card
                        title={item.title}
                        imageUrl={item.images}
                        subTitle={"$" + item.price}
                        onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                    />
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 3,
        paddingBottom: -20,
        backgroundColor: "#f8f4f4"
    },
});

export default SellerListing;