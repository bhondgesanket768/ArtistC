import React, { useState } from 'react';
import Screen from '../components/Screen';
import * as Yup from "yup"
import { AppForm, AppFormField, SubmitButton } from '../components/Form';
import AppFormPicker from '../components/Form/AppFormPicker';
import { StyleSheet, ScrollView, View, Alert } from "react-native"
import CategoryPickerItem from '../components/CategoryPickerItem';
import FormImagePicker from '../components/Form/FormImagePicker';
import useLocation from '../hooks/useLocation';
import listingsApi from "../api/Listings"
import UploadScreen from './UploadScreen';
import useAuth from "../auth/useAuth"
import AppText from '../components/AppText';

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

function ListingEditScreen() {

    const { user } = useAuth()

    const location = useLocation();
    const [progress, setProgress] = useState(0)
    const [progressVisible, setProgressvisible] = useState(false)

    const handleSubmit = async (values, { resetForm }) => {
        setProgress(0)
        setProgressvisible(true)

        values.images.forEach((image) => {

            let newFile = { uri: image, type: `test/${image.split(".")[1]}`, name: `test/${image.split(".")[1]}` }
            const newData = new FormData()
            newData.append("file", newFile)
            newData.append("upload_preset", "artistApp")
            newData.append("cloud_name", "artistc")

            fetch("https://api.cloudinary.com/v1_1/artistc/image/upload", {
                method: "post",
                body: newData
            })
                .then(response => response.json())
                .then(async data => {
                    let value = {
                        title: values.title,
                        price: values.price,
                        categoryId: values.category.value,
                        description: values.description,
                        image: data.url
                    }

                    const result = await listingsApi.postListings(
                        { ...value, location: JSON.stringify(location), userId: user.userId },
                        progress => setProgress(progress)
                    )

                    if (!result.ok) {
                        setProgressvisible(false)
                        return alert("Could not able to save your post")
                    }
                })
        })
        setTimeout(() => {
            resetForm()
            Alert.alert("Success", "Your listing added successfully")
        }, 3000)
    }

    return (
        <Screen style={styles.container}>
            <UploadScreen progress={progress} visible={progressVisible} done={() => setProgressvisible(false)} />
            <ScrollView>
                <View style={styles.heading}>
                    <AppText style={styles.text}> Add your listings </AppText>
                </View>
                <AppForm
                    initialValues={{ title: "", price: "", description: "", category: null, images: [] }}
                    onSubmit={handleSubmit}
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
                        placeholder="Price in $"
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
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    heading: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: "500"
    }
})

export default ListingEditScreen;