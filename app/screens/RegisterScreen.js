import React, { useState } from 'react';
import Screen from '../components/Screen';
import { StyleSheet } from "react-native"
import * as Yup from "yup"
import { AppFormField, AppForm, SubmitButton, ErrorMessage } from "../components/Form"
import AuthApi from "../api/auth"
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(5).label("Password")
})

function RegisterScreen(props) {

    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const { logIn } = useAuth()
    const registerApi = useApi(AuthApi.register)
    const loginApi = useApi(AuthApi.login)

    const handleRegister = async (userInfo) => {
        const result = await registerApi.request(userInfo)
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
    }

    return (
        <React.Fragment>
            <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
            <Screen style={styles.container}>
                <AppForm
                    initialValues={{ name: "", email: "", password: "" }}
                    onSubmit={handleRegister}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage visible={error} error={errMsg} />
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
            </Screen>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})

export default RegisterScreen;