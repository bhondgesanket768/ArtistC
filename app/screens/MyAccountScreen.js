import React from 'react';
import Screen from "../components/Screen"
import { View, StyleSheet, FlatList } from 'react-native';
import Icon from '../components/Icon';
import { ListItemSeparator, ListItems } from "../components/Lists"

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
        }
    }
]

function MyAccountScreen(props) {
    return (
        <Screen style={styles.screen}>
            <View style={styles.userContainer}>
                <ListItems
                    title="Sanket Bhondge"
                    subTitle="sanketbhondge123@gmail.com"
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
                        />
                    }
                />
            </View>
            <ListItems
                title="Logout"
                IconComponent={
                    <Icon name="logout" backgroundColor="#ffe66d" />
                }
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