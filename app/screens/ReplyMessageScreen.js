import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import ContactSellerForm from '../components/ContactSellerForm';

function ReplyMessageScreen({ route }) {

    const listing = route.params

    return (
        <View style={styles.container}>
            <AppText>{`Message : ${listing.content}`}</AppText>
            <View>
                <ContactSellerForm replay listing={listing} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});

export default ReplyMessageScreen;