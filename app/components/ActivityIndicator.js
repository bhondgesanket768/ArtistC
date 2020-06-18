import React from 'react';
import LottiView from "lottie-react-native"
import { View, StyleSheet } from 'react-native';

function ActivityIndicator({ visible = false }) {
    if (!visible) return null

    return (
        <View style={styles.overlay}>
            <LottiView
                source={require("../assets/animations/loader.json")}
                loop
                autoPlay
            />
        </View>
    );
}
const styles = StyleSheet.create({
    overlay: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        position: "absolute",
        zIndex: 1,
        opacity: 0.8
    }
})

export default ActivityIndicator;