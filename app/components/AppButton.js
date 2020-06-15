import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const AppButton = ({ title, onPress, color = "orange" }) => {
    return (
        <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: color }]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "orange",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "100%",
        marginVertical: 10
    },
    text: {
        color: "white",
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold"
    }
})

export default AppButton;