import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import AppText from '../AppText';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from "@expo/vector-icons"

function ListItems({ image, title, subTitle, onPress, renderRightActions, IconComponent, isChevron, account }) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight onPress={onPress} underlayColor="#f8f4f4" >
                <View style={styles.container}>
                    {IconComponent}
                    {account ? <Image source={{ uri: image }} style={styles.image} /> : (image && <Image source={image} style={styles.image} />)}
                    <View style={styles.detailContainer}>
                        <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
                        {subTitle && <AppText style={styles.subTitle} numberOfLines={2}>{subTitle}</AppText>}
                    </View>
                    {isChevron &&
                        <View style={styles.chevron}>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#6e6969" />
                        </View>
                    }
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "white",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    title: {
        fontWeight: "bold"
    },
    subTitle: {
        color: "#6e6969"
    },
    detailContainer: {
        marginLeft: 10,
        justifyContent: "center",
        flex: 1,
    },
    chevron: {
        alignSelf: "center"
    }
})

export default ListItems;