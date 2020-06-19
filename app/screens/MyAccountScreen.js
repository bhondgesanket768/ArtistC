import React, { useEffect, useState } from 'react';
import Screen from "../components/Screen"
import { View, StyleSheet, FlatList } from 'react-native';
import Icon from '../components/Icon';
import { ListItemSeparator, ListItems } from "../components/Lists"
import routes from "../navigation/Routes"
import useAuth from '../auth/useAuth';
import AuthApi from "../api/auth"
import listingApi from "../api/Listings"

const menuItems = [
    {
        title: "My Listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: "#ff5252"
        },
        targetScreen: routes.MY_LISTING,
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: "green"
        },
        targetScreen: routes.MESSAGES
    }
]

function MyAccountScreen({ navigation }) {

    const { user, logOut } = useAuth()
    const [userData, setUserData] = useState();
    const [userListing, setUserListing] = useState([]);

    const getUsers = async () => {
        const result = await AuthApi.getUser(user.userId)
        if (!result.ok) return;
        setUserData(result.data)
    }

    const getUserListing = async () => {
        const result = await listingApi.getUserListing(user.userId)
        if (!result.ok) return;
        setUserListing(result.data)
    }

    useEffect(() => {
        getUsers();
        getUserListing()
    }, [])

    return (
        <Screen style={styles.screen}>
            <View style={styles.userContainer}>
                <ListItems
                    title={user.name}
                    subTitle={user.email}
                    image={userData && userData.profile}
                    account
                />
            </View>
            <View style={styles.userContainer}>
                <FlatList
                    data={menuItems}
                    keyExtractor={menuItem => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) =>
                        <ListItems
                            title={item.title}
                            IconComponent={
                                <Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />
                            }
                            onPress={() => {
                                if (item.title === "My Listings") {
                                    navigation.navigate(item.targetScreen, userListing)
                                } else {
                                    navigation.navigate(item.targetScreen)
                                }
                            }}
                            isChevron
                        />
                    }
                />
            </View>
            <ListItems
                title="Logout"
                IconComponent={
                    <Icon name="logout" backgroundColor="#ffe66d" />
                }
                onPress={() => logOut()}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    userContainer: {
        marginVertical: 20,
    },
    screen: {
        backgroundColor: "#f8f4f4"
    }
})

export default MyAccountScreen;