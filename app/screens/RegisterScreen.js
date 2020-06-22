import React, { useState } from 'react';
import Screen from '../components/Screen';
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native"
import * as Yup from "yup"
import { AppFormField, AppForm, SubmitButton, ErrorMessage } from "../components/Form"
import AuthApi from "../api/auth"
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';
import ProfileImagePicker from '../components/Form/ProfileImagePicker';

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(5).label("Password"),
    profile: Yup.string().required().label("Profile"),
    phone: Yup.number().required().min(1000000000).label("Phone No")
})

function RegisterScreen(props) {

    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const { logIn } = useAuth()
    const registerApi = useApi(AuthApi.register)
    const loginApi = useApi(AuthApi.login)
    const [externalLoading, setExternalLoading] = useState(false)

    const handleRegister = async (userInfo) => {

        setExternalLoading(true);

        let newFile = { uri: userInfo.profile, type: `test/${userInfo.profile.split(".")[1]}`, name: `test/${userInfo.profile.split(".")[1]}` }
        const newData = new FormData()
        newData.append("file", newFile)
        newData.append("upload_preset", "artistApp")
        newData.append("cloud_name", "artistc")

        fetch("https://api.cloudinary.com/v1_1/artistc/image/upload", {
            method: "post",
            body: newData
        }).then(response => response.json())
            .then(async data => {
                const value = Object.assign({}, userInfo, { profile: data.url })

                const result = await registerApi.request(value)

                setExternalLoading(false);

                if (!result.ok) {
                    setError(true)
                    if (result.data) {
                        setErrMsg(result.data.error)
                    } else {
                        setErrMsg("An unexpected error occured");
                    }
                    return
                }

                setError(false);
                const { data: authToken } = await loginApi.request(userInfo.email, userInfo.password)
                logIn(authToken)
            })
    }

    return (
        <React.Fragment>
            <ImageBackground source={require("../assets/login.jpg")} style={styles.background} blurRadius={1}>
                <ActivityIndicator visible={registerApi.loading || loginApi.loading || externalLoading} />
                <Screen style={styles.container}>
                    <ScrollView>
                        <AppForm
                            initialValues={{ name: "", email: "", password: "", profile: "", phone: "" }}
                            onSubmit={handleRegister}
                            validationSchema={validationSchema}
                        >
                            <ErrorMessage visible={error} error={errMsg} />
                            <View style={styles.profile}>
                                <ProfileImagePicker name="profile" />
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
                            <AppFormField
                                placeholder="Password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="lock"
                                textContentType="password"
                                secureTextEntry
                                name="password"
                            />
                            <SubmitButton title="Register" />
                        </AppForm>
                    </ScrollView>
                </Screen>
            </ImageBackground>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: -10,
        flex: 1,
        width: "100%",
        height: "100%"
    },
    profile: {
        justifyContent: "center",
        alignItems: "center"
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    }
})

export default RegisterScreen;