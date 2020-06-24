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
import MapView from 'react-native-maps';

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
        let mounted = true
        if (mounted) {
            getUsers();
            getUserListing();
        }
        return () => mounted = false
    }, [])

    const coords = {
        latitude: listing.location ? listing.location.latitude : "",
        longitude: listing.location ? listing.location.longitude : "",
    }

    return (
        <ScrollView>
            <View style={styles.imgContainer}>
                <Image style={styles.image} uri={listing.images} tint="light" />
            </View>
            <View style={styles.container}>
                <AppText style={styles.title}>{listing.title}</AppText>
                {listing.description !== "" && <AppText style={styles.description}>{listing.description}</AppText>}
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
            {listing.location &&
                <View>
                    <AppText style={styles.text}>Seller Posting location</AppText>
                    <MapView style={styles.mapStyle}
                        region={{
                            latitude: listing.location.latitude,
                            longitude: listing.location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    >
                        <MapView.Marker
                            key={1}
                            coordinate={coords}
                        />
                    </MapView>
                </View>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imgContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    image: {
        alignSelf: "stretch",
        flex: 1,
        resizeMode: "contain",
        aspectRatio: 1
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
        borderColor: "black",
        borderWidth: 1
    },
    contact: {
        padding: 10,
        flexDirection: "row"
    },
    no: {
        fontWeight: "600"
    },
    mapStyle: {
        width: "100%",
        height: 300
    },
    text: {
        padding: 20,
    }
})

export default ListingDetailsScreen;