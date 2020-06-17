import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import LottieView from "lottie-react-native"
import * as Progress from "react-native-progress"

function UploadScreen({ progress = 0, visible = false, done }) {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                {progress < 1 ? <Progress.Bar progress={progress} color="orange" width={200} /> : <LottieView autoPlay source={require("../assets/animations/done.json")} loop={false} style={styles.animation} onAnimationFinish={done} />}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    animation: {
        width: 250,
        height: 250
    }
});

export default UploadScreen;