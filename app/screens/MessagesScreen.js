import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, View, Alert } from 'react-native';
import ListItems from '../components/Lists/ListItems';
import Screen from "../components/Screen"
import { ListItemSeparator, ListItemsDelete } from "../components/Lists"
import useAuth from '../auth/useAuth';
import messagesApi from "../api/messages"
import AppText from '../components/AppText';
import { useNavigation } from '@react-navigation/native';
import routes from "../navigation/Routes"

function MessagesScreen(props) {

    const { user } = useAuth()

    const navigation = useNavigation();

    const [msgList, setMsgList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getMessages = async () => {
        const result = await messagesApi.getMessages(user.userId);
        if (!result.ok) return;
        setMsgList(result.data)
    }

    useEffect(() => {
        getMessages()
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        getMessages()
        setRefreshing(false)
    }

    const handleDelete = async (msg) => {
        const result = await messagesApi.deleteMessage(msg._id)
        if (!result.ok) {
            Alert.alert("Failed", "failed to delete message", [
                { text: "Ok" }
            ])
            return;
        }
        getMessages();
        Alert.alert("Success", "Message deleted successfully", [
            { text: "Ok" }
        ])
    }

    return (
        <Screen>
            {msgList.length > 0 ? (
                <FlatList
                    data={msgList}
                    keyExtractor={msg => msg._id.toString()}
                    renderItem={({ item }) => <ListItems title={item.senderName}
                        image={item.senderProfile}
                        subTitle={item.content}
                        onPress={() => navigation.navigate(routes.REPLAY, item)}
                        renderRightActions={() => <ListItemsDelete onPress={() => handleDelete(item)} />}
                        isChevron
                        account
                    />}
                    ItemSeparatorComponent={ListItemSeparator}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            ) : (
                    <View style={styles.empty}>
                        <AppText>Your message list is empty</AppText>
                    </View>
                )}
        </Screen >
    );
}

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})


export default MessagesScreen;