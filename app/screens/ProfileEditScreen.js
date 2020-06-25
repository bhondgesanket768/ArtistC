import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AppText from '../components/AppText';
import Screen from "../components/Screen"
import { ScrollView } from 'react-native-gesture-handler';
import { AppForm, AppFormField, SubmitButton } from '../components/Form';
import * as Yup from "yup"
import ProfileImagePicker from '../components/Form/ProfileImagePicker';
import AuthApi from "../api/auth"
import useApi from "../hooks/useApi"
import ActivityIndicator from '../components/ActivityIndicator';
import { useNavigation } from '@react-navigation/native';
import routes from "../navigation/Routes"

function ProfileEditScreen({ route }) {

    const data = route.params

    const updateApi = useApi(AuthApi.updateAccount);
    const [externalLoading, setExternalLoading] = useState(false);
    const navigation = useNavigation()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required().label("Name"),
        email: Yup.string().required().email().label("Email"),
        profile: Yup.string().required().nullable().label("Profile"),
        phone: Yup.number().required().min(1000000000).label("Phone No")
    })

    const handleEdit = async (values) => {
        if (values.name === data.name && values.email === data.email && values.profile === data.profile && values.phone === JSON.stringify(data.phone)) {
            Alert.alert("Note", "You have not change any of the field")
            return;
        }

        setExternalLoading(true)

        if (values.profile !== data.profile) {
            let newFile = { uri: values.profile, type: `test/${values.profile.split(".")[1]}`, name: `test/${values.profile.split(".")[1]}` }
            const newData = new FormData()
            newData.append("file", newFile)
            newData.append("upload_preset", "artistApp")
            newData.append("cloud_name", "artistc")

            fetch("https://api.cloudinary.com/v1_1/artistc/image/upload", {
                method: "post",
                body: newData
            }).then(response => response.json())
                .then(async response => {
                    const updatedValues = {
                        name: values.name,
                        email: values.email,
                        phone: values.phone,
                        profile: response.url,
                        userId: data._id
                    }

                    const result = await updateApi.request(updatedValues)

                    setExternalLoading(false);

                    if (!result.ok) {
                        Alert.alert("Error", "Something went wrong")
                        return;
                    }
                    Alert.alert("Success", "Profile Updated successfully", [
                        { text: "Ok", onPress: () => navigation.navigate(routes.Account, true) }
                    ]);
                })
        } else {
            const updatedValues = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                profile: data.profile,
                userId: data._id
            }

            const result = await updateApi.request(updatedValues)

            setExternalLoading(false)

            if (!result.ok) {
                Alert.alert("Error", "Something went wrong")
                return;
            }
            Alert.alert("Success", "Profile Updated successfully", [
                { text: "Ok", onPress: () => navigation.navigate(routes.Account, true) }
            ]);
        }
    }

    return (
        <React.Fragment>
            <ActivityIndicator visible={updateApi.loading || externalLoading} />
            <Screen style={styles.container}>
                <ScrollView>
                    <AppForm
                        initialValues={{ name: data.name, email: data.email, phone: JSON.stringify(data.phone), profile: data.profile }}
                        onSubmit={handleEdit}
                        validationSchema={validationSchema}
                    >
                        <View style={styles.profile}>
                            <ProfileImagePicker name="profile" initialValue={data.profile} profile />
                        </View>
                        <AppFormField
                            name="name"
                            placeholder="Name"
                            icon="account"
                            autoCorrect={false}
                        />
                        <AppFormField
                            name="email"
                            placeholder="Email"
                            icon="email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            textContentType="emailAddress"
                        />
                        <AppFormField
                            name="phone"
                            placeholder="Mobile No"
                            icon="cellphone"
                            keyboardType="numeric"
                            maxLength={10}
                        />
                        <SubmitButton title="Update" />
                    </AppForm>
                </ScrollView>
            </Screen>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 3
    },
    profile: {
        justifyContent: "center",
        alignItems: "center",
    }
});

export default ProfileEditScreen;