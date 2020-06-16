import React from 'react';
import Screen from '../components/Screen';
import * as Yup from "yup"
import { AppForm, AppFormField, SubmitButton } from '../components/Form';
import AppFormPicker from '../components/Form/AppFormPicker';
import { StyleSheet } from "react-native"
import CategoryPickerItem from '../components/CategoryPickerItem';
import FormImagePicker from '../components/Form/FormImagePicker';
import useLocation from '../hooks/useLocation';

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(100000).label("Price"),
    description: Yup.string().label("Description"),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Please select atleast one Image")
})

const categories = [
    { label: "Sketchs", value: 1, backgroundColor: "red", icon: "book-open-variant" },
    { label: "Paintings", value: 2, backgroundColor: "green", icon: "feather" },
    { label: "Craft work", value: 3, backgroundColor: "pink", icon: "artist" },
    { label: "others", value: 4, backgroundColor: "blue", icon: "application" },
]

function ListingEditScreen(props) {

    const location = useLocation();

    return (
        <Screen style={styles.container}>
            <AppForm
                initialValues={{ title: "", price: "", description: "", category: null, images: [] }}
                onSubmit={(values) => console.log(location)}
                validationSchema={validationSchema}
            >
                <FormImagePicker name="images" />
                <AppFormField
                    name="title"
                    placeholder="Title"
                    maxLength={255}
                />
                <AppFormField
                    keyboardType="numeric"
                    maxLength={8}
                    name="price"
                    placeholder="Price"
                    width="40%"
                />
                <AppFormPicker items={categories} name="category" placeholder="Category" width="50%" PickerItemComponent={CategoryPickerItem} numberOfColumns={3} />
                <AppFormField
                    name="description"
                    placeholder="Description"
                    maxLength={255}
                    multiline
                    numberOfLines={3}
                />
                <SubmitButton title="Post" />
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})

export default ListingEditScreen;