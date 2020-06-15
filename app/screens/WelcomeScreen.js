import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import AppButton from '../components/AppButton';

function WelcomeScreen(props) {
    return (
        <ImageBackground source={require("../assets/background.jpg")} style={styles.background} blurRadius={1}>
            <View style={styles.container}>
                <Image source={require("../assets/logo-red.png")} style={styles.logo} />
                <Text style={styles.tagLine}>Sell your artistic work here</Text>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton title="login" />
                <AppButton title="register" color="green" />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    buttonContainer: {
        padding: 20,
        width: "100%"
    },
    logo: {
        width: 100,
        height: 100,
    },
    container: {
        position: "absolute",
        top: 100,
        alignItems: "center"
    },
    tagLine: {
        fontSize: 25,
        fontWeight: "600",
        paddingVertical: 20
    }
})

export default WelcomeScreen;