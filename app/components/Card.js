import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from './AppText';

import { Image } from "react-native-expo-image-cache"
import AppButton from './AppButton';

function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl, remove, onRemovePress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image uri={imageUrl} style={styles.cardImg} preview={{ uri: thumbnailUrl }} tint="light" />
                </View>
                <View style={styles.container}>
                    <View>
                        <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
                        <AppText style={styles.subTitle} numberOfLines={2}>{subTitle}</AppText>
                    </View>
                    {remove && <AppButton title="Remove" onPress={onRemovePress} />}
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
        overflow: "hidden",
        borderColor: "black",
        borderWidth: 1
    },
    imageContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    cardImg: {
        flex: 1,
        resizeMode: "contain",
        aspectRatio: 1
    },
    container: {
        padding: 10,
    },
    subTitle: {
        color: "green",
        fontWeight: "bold"
    },
    title: {
        marginBottom: 8
    },
})

export default Card;