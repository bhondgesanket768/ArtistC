import React from 'react';
import LottiView from "lottie-react-native"

function ActivityIndicator({ visible = false }) {
    if (!visible) return null

    return (
        <LottiView
            source={require("../assets/animations/loader.json")}
            loop
            autoPlay
        />
    );
}

export default ActivityIndicator;