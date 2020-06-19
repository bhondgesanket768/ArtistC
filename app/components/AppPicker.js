import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Modal, Button, FlatList } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppText from './AppText';
import Screen from './Screen';
import PickerItem from './PickerItem';
import AppButton from './AppButton';

function AppPicker({ icon, placeholder, items, selected, onSelectItem, width = "100%", PickerItemComponent = PickerItem, numberOfColumns = 1 }) {

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <React.Fragment>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={[styles.container, { width }]}>
                    {icon && <MaterialCommunityIcons name={icon} size={20} color="#6e6969" style={styles.icon} />}
                    {selected ? (
                        <AppText style={styles.text}>{selected.label}</AppText>
                    ) : (
                            <AppText style={styles.placeholder}>{placeholder}</AppText>
                        )}
                    <MaterialCommunityIcons name="chevron-down" size={20} color="#6e6969" />
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="fade" >
                <View style={styles.button}>
                    <AppButton title="close" onPress={() => setModalVisible(false)} />
                </View>
                <FlatList
                    data={items}
                    keyExtractor={item => item.value.toString()}
                    numColumns={numberOfColumns}
                    renderItem={({ item }) =>
                        <PickerItemComponent label={item.label} onPress={() => {
                            setModalVisible(false)
                            onSelectItem(item)
                        }}
                            item={item}
                        />
                    }
                />
            </Modal>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f4f4",
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10
    },
    icon: {
        marginRight: 10
    },
    text: {
        flex: 1
    },
    placeholder: {
        color: "#6e6969",
        flex: 1
    },
    button: {
        padding: 20
    }
})

export default AppPicker;