import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AppText from '../components/AppText';
import { ListItems } from "../components/Lists"
import { Image } from "react-native-expo-image-cache"
import ContactSellerForm from '../components/ContactSellerForm';
import AuthApi from "../api/auth"
import listingApi from "../api/Listings"
import { useNavigation } from '@react-navigation/native';
import routes from "../navigation/Routes"

const category = ["Sketchs", "Paintings", "Craft work", "others"]

function ListingDetailsScreen({ route }) {

    const listing = route.params

    const navigation = useNavigation();

    const [user, setUser] = useState();
    const [userListing, setUserListing] = useState([]);
    const [totalListings, setTotalListings] = useState(0);

    const getUsers = async () => {
        const result = await AuthApi.getUser(listing.userId)
        if (!result.ok) return;
        setUser(result.data)
    }

    const getUserListing = async () => {
        const result = await listingApi.getUserListing(listing.userId)
        if (!result.ok) return;
        setUserListing(result.data)
        setTotalListings(result.data.length)
    }

    useEffect(() => {
        getUsers();
        getUserListing();
    }, [])

    return (
        <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
            <ScrollView>
                <Image style={styles.image} uri={listing.data ? listing.data.url : listing.images[0].url} preview={{ uri: listing.data ? listing.data.thumbnailUrl : listing.images[0].thumbnailUrl }} tint="light" />
                <View style={styles.container}>
                    <AppText style={styles.title}>{listing.title}</AppText>
                    <AppText style={styles.description}>{listing.description}</AppText>
                    <AppText style={styles.category}>{`Category : ${category[listing.categoryId - 1]}`}</AppText>
                    <AppText style={styles.price}>{`$ ${listing.price}`}</AppText>
                    <View style={styles.userContainer}>
                        <ListItems
                            image={user ? user.profile : " "}
                            title={user ? user.name : " "}
                            subTitle={`${totalListings} listings`}
                            isChevron
                            account
                            onPress={() => navigation.navigate(routes.SELLER_lISTING, userListing)}
                        />
                    </View>
                    <View style={styles.contact}>
                        <AppText>Seller Contact : </AppText>
                        <AppText style={styles.no}>{user ? user.phone : " "}</AppText>
                    </View>
                    <ContactSellerForm listing={listing} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
    },
    container: {
        padding: 20,
    },
    category: {
        paddingTop: 5
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
        paddingTop: 5
    },
    userContainer: {
        marginVertical: 20,
        width: "100%",
    },
    contact: {
        padding: 10,
        flexDirection: "row"
    },
    no: {
        fontWeight: "600"
    }
})

export default ListingDetailsScreen;