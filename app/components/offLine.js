import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import Constants from "expo-constants"
import { useNetInfo } from "@react-native-community/netinfo"

function OffLine(props) {
    const netInfo = useNetInfo()

    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
        return (
            <View style={styles.container}>
                <AppText>No Internet Connection</AppText>
            </View>
        );
    }
    return null
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 80,
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        top: Constants.statusBarHeight
    }
});

export default OffLine;