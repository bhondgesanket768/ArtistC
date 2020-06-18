import React, { useState } from 'react';
import { StyleSheet, Image } from "react-native"
import Screen from '../components/Screen';
import * as Yup from "yup"
import { AppFormField, SubmitButton, AppForm, ErrorMessage } from "../components/Form"
import AuthApi from "../api/auth"
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(5).label("Password")
})

function LoginScreen(props) {

    const [error, setError] = useState(false)
    const { logIn } = useAuth()

    const handleLogin = async ({ email, password }) => {
        const result = await AuthApi.login(email, password)
        if (!result.ok) {
            return setError(true)
        }
        setError(false)
        logIn(result.data)
    }

    return (
        <Screen style={styles.container}>
            <Image source={require("../assets/logo-red.png")} style={styles.image} />

            <AppForm
                initialValues={{ email: "", password: "" }}
                onSubmit={handleLogin}
                validationSchema={validationSchema}
            >
                <ErrorMessage error="Invalid email or password" visible={error} />
                <AppFormField
                    placeholder="Email"
                    icon="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    name="email"
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
                <SubmitButton title="Login" />
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 60,
        marginBottom: 20
    },
    container: {
        padding: 10
    }
})

export default LoginScreen;