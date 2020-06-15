import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"

function ViewImageScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.closeIcon}>
                <MaterialCommunityIcons name="close" color="white" size={30} />
            </View>
            <View style={styles.deleteIcon}>
                <MaterialCommunityIcons name="delete" color="white" size={30} />
            </View>
            <Image source={require("../assets/chair.jpg")} style={styles.image} resizeMode="contain" />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%"
    },
    container: {
        backgroundColor: "#000",
        flex: 1
    },
    closeIcon: {
        position: "absolute",
        top: 20,
        left: 30
    },
    deleteIcon: {
        position: "absolute",
        top: 20,
        right: 30
    }
})

export default ViewImageScreen;