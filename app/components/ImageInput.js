import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"

function ImageInput({ imageUri, onChangeImage, profile }) {

    useEffect(() => {
        requestPermission()
    }, [])

    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestCameraRollPermissionsAsync()
        if (!granted) {
            alert("you need to take permission")
        }
    }

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5
            })
            if (!result.cancelled) {
                onChangeImage(result.uri)
            }
        } catch (err) {
            console.log("error in cpaturing image", err)
        }
    }

    const handlePress = () => {
        if (!imageUri) {
            selectImage();
        } else {
            Alert.alert("Delete", "Are you sure you want to remove this image ?", [
                { text: "Yes", onPress: () => onChangeImage(null) },
                { text: "No" }
            ])
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={profile ? [styles.container, { borderRadius: 55 }] : styles.container}>
                {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : <MaterialCommunityIcons name="camera" color="white" size={30} />}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: 110,
        backgroundColor: "grey",
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%"
    }
});

export default ImageInput;