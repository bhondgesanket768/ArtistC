import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import defaultStyles from "../config/styles";

function AppTextInput({ icon, width, ...otherProps }) {
    return (
        <View style={[styles.container, { width }]}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color="#6e6969" style={styles.icon} />}
            <TextInput style={[defaultStyles.text, { width: "100%" }]} {...otherProps} placeholderTextColor="#6e6969" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f4f4",
        borderRadius: 25,
        flexDirection: "row",
        width: "100%",
        padding: 15,
        marginVertical: 10
    },
    icon: {
        marginRight: 10
    },
})

export default AppTextInput;