import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ImageInput from './ImageInput';

function ImageInputList({ imageUris = [], onRemoveImage, OnAddImage }) {

    const scrollView = useRef();

    return (
        <View>
            <ScrollView horizontal={true} ref={scrollView} onContentSizeChange={() => scrollView.current.scrollToEnd()}>
                <View style={styles.container}>
                    {imageUris.map((uri) => <ImageInput imageUri={uri} key={uri} onChangeImage={() => onRemoveImage(uri)} />)}
                    <ImageInput onChangeImage={uri => OnAddImage(uri)} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    }
});

export default ImageInputList;