import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import AppText from './AppText';

function CategoryPickerItem({ onPress, item }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View>
                <Icon name={item.icon} backgroundColor={item.backgroundColor} size={80} />
                <AppText style={styles.label}>{item.label}</AppText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        alignItems: "center",
        width: "33%"
    },
    label: {
        marginTop: 5,
        textAlign: "center"
    }
})

export default CategoryPickerItem;