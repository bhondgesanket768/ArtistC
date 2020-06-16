import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from './AppText';

function Card({ title, subTitle, image, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <Image source={image} style={styles.cardImg} />
                <View style={styles.container}>
                    <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
                    <AppText style={styles.subTitle} numberOfLines={2}>{subTitle}</AppText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: "white",
        marginBottom: 20,
        overflow: "hidden"
    },
    cardImg: {
        width: "100%",
        height: 200,
    },
    container: {
        padding: 20
    },
    subTitle: {
        color: "green",
        fontWeight: "bold"
    },
    title: {
        marginBottom: 8
    }
})

export default Card;