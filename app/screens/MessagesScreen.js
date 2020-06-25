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
import useApi from "../hooks/useApi"
import ActivityIndicator from "../components/ActivityIndicator"

function MessagesScreen(props) {

    const { user } = useAuth()

    const navigation = useNavigation();

    const { data: msgList, error, loading, request: loadListings } = useApi(messagesApi.getMessages)

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadListings(user.userId)
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        loadListings(user.userId)
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
        loadListings(user.userId)
        Alert.alert("Success", "Message deleted successfully", [
            { text: "Ok" }
        ])
    }

    return (
        <Screen style={styles.container}>
            <ActivityIndicator visible={loading} />
            {!loading && msgList.length === 0 && <View style={styles.empty}>
                <AppText>Your message list is empty</AppText>
            </View>}
            <FlatList
                data={msgList}
                keyExtractor={msg => msg._id.toString()}
                renderItem={({ item }) => <ListItems title={item.formUser.name}
                    image={item.formUser.profile}
                    subTitle={item.content}
                    onPress={() => navigation.navigate(routes.REPLAY, item)}
                    renderRightActions={() => <ListItemsDelete onPress={() => handleDelete(item)} />}
                    isChevron
                    account
                />}
                ItemSeparatorComponent={ListItemSeparator}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </Screen >
    );
}

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        paddingTop: 3
    }
})


export default MessagesScreen;