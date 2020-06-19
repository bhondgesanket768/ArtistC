import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from './AppText';

import { Image } from "react-native-expo-image-cache"
import AppButton from './AppButton';

function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl, remove }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <Image uri={imageUrl} style={styles.cardImg} preview={{ uri: thumbnailUrl }} tint="light" />
                <View style={styles.container}>
                    <View>
                        <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
                        <AppText style={styles.subTitle} numberOfLines={2}>{subTitle}</AppText>
                    </View>
                    {remove && <AppButton title="Remove" onPress={onPress} />}
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
        height: 230,
    },
    container: {
        padding: 20,
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