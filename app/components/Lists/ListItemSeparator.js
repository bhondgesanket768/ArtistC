import React from 'react';
import { View, StyleSheet } from 'react-native';

function ListItemSeparator(props) {
    return (
        <View style={styles.seperator} />
    );
}

const styles = StyleSheet.create({
    seperator: {
        width: "100%",
        height: 1,
        backgroundColor: "#f8f4f4"
    }
})

export default ListItemSeparator;