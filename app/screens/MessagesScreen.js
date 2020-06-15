import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItems from '../components/Lists/ListItems';
import Screen from "../components/Screen"
import { ListItemSeparator, ListItemsDelete } from "../components/Lists"

const messages = [
    {
        id: 1,
        title: "t1",
        description: "d1",
        image: require("../assets/profile.jpg")
    },
    {
        id: 2,
        title: "t2",
        description: "d2",
        image: require("../assets/profile.jpg")
    },
    {
        id: 3,
        title: "t3",
        description: "d3",
        image: require("../assets/profile.jpg")
    }
]

function MessagesScreen(props) {

    const [msgList, setMsgList] = useState(messages);
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = msg => {
        const newList = msgList.filter(message => message.id !== msg.id);
        setMsgList(newList);
    }

    return (
        <Screen>
            <FlatList
                data={msgList}
                keyExtractor={msg => msg.id.toString()}
                renderItem={({ item }) => <ListItems title={item.title}
                    image={item.image}
                    subTitle={item.description}
                    onPress={() => console.log("Message selected", item)}
                    renderRightActions={() => <ListItemsDelete onPress={() => handleDelete(item)} />}
                />}
                ItemSeparatorComponent={ListItemSeparator}
                refreshing={refreshing}
                onRefresh={() => {
                    setMsgList([
                        {
                            id: 3,
                            title: "t3",
                            description: "d3",
                            image: require("../assets/profile.jpg")
                        }
                    ])
                }}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({

})


export default MessagesScreen;