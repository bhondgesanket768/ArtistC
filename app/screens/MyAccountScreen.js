import React, { useEffect, useState } from 'react';
import Screen from "../components/Screen"
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import Icon from '../components/Icon';
import { ListItemSeparator, ListItems } from "../components/Lists"
import routes from "../navigation/Routes"
import useAuth from '../auth/useAuth';
import AuthApi from "../api/auth"
import listingApi from "../api/Listings"
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from "../hooks/useApi"

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

function MyAccountScreen({ navigation, route }) {

    const { user, logOut } = useAuth()
    const [userData, setUserData] = useState();
    const [userListing, setUserListing] = useState([]);
    const deleteApi = useApi(AuthApi.deleteAccount)

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
        let mounted = true
        if (mounted) {
            getUsers();
            getUserListing()
        }
        return () => mounted = false
    }, [route.params])

    const removeUser = async (userId) => {
        const result = await deleteApi.request(userId)
        if (!result.ok) {
            return Alert.alert("Error", "Could not able to delete your account, something went wrong")
        }
        logOut();
        Alert.alert("Success", "Account deleted successfully")
    }

    const handleDelete = () => {
        Alert.alert("Deleting", "Are you sure you want to delete your account", [
            { text: "Yes", onPress: () => removeUser(user.userId) },
            { text: "No" }
        ])
    }

    return (
        <React.Fragment>
            <ActivityIndicator visible={!userData || deleteApi.loading} />
            <Screen style={styles.screen}>
                <View style={styles.userContainer}>
                    <ListItems
                        title={userData && userData.name}
                        subTitle={userData && userData.email}
                        image={userData && userData.profile}
                        account
                        accountEdit
                        onEditPress={() => navigation.navigate(routes.PROFILE_EDIT, userData)}
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
                <View style={styles.removeAccount}>
                    <ListItems
                        title="Delete Account"
                        IconComponent={
                            <Icon name="delete" backgroundColor="red" />
                        }
                        onPress={handleDelete}
                    />
                </View>
            </Screen>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    userContainer: {
        marginVertical: 20,
    },
    screen: {
        backgroundColor: "#f8f4f4"
    },
    removeAccount: {
        paddingTop: 10
    }
})

export default MyAccountScreen;