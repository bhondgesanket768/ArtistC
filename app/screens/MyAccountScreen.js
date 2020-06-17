import React, { useContext } from 'react';
import Screen from "../components/Screen"
import { View, StyleSheet, FlatList } from 'react-native';
import Icon from '../components/Icon';
import { ListItemSeparator, ListItems } from "../components/Lists"
import routes from "../navigation/Routes"
import AuthContext from '../auth/context';
import authStorage from "../auth/storage"

const menuItems = [
    {
        title: "My Listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: "#ff5252"
        }
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

    const authContext = useContext(AuthContext)

    const handleLogOut = () => {
        authContext.setUser(null);
        authStorage.removeToken()
    }

    return (
        <Screen style={styles.screen}>
            <View style={styles.userContainer}>
                <ListItems
                    title={authContext.user.name}
                    subTitle={authContext.user.email}
                    image={require("../assets/profile.jpg")}
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
                            onPress={() => navigation.navigate(item.targetScreen)}
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
                onPress={handleLogOut}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    userContainer: {
        marginVertical: 20,
    },
    screen: {
        backgroundColor: "#f8f4f4" // need to change
    }
})

export default MyAccountScreen;