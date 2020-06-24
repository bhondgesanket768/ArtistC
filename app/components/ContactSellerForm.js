import React from 'react';
import { Alert } from 'react-native';
import { AppForm, AppFormField, SubmitButton } from './Form';
import * as Yup from "yup"
import messagesApi from "../api/messages"
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
    message: Yup.string().required().min(1).label("Message"),
});

function ContactSellerForm({ listing, replay }) {

    const { user } = useAuth();

    const data = replay ? listing.listingId : listing._id

    const handleSubmit = async ({ message }, { resetForm }) => {

        var result;
        if (replay) {
            result = await messagesApi.replayMessages(message, data, user.userId, listing.formUser)
        } else {
            result = await messagesApi.send(message, data, user.userId);
        }

        if (!result.ok) {
            console.log("Error", result);
            return Alert.alert("Error", "Could not send the message to the seller.");
        }

        resetForm();

        if (replay) {
            Alert.alert("Awesome", "Your message is sent Successfully.")
        } else {
            Alert.alert("Awesome", "Your message is sent to the seller.")
        }

    };

    return (
        <AppForm
            initialValues={{ message: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            <AppFormField
                maxLength={255}
                multiline
                name="message"
                numberOfLines={3}
                placeholder={replay ? "Replay..." : "Message..."}
            />
            <SubmitButton title={replay ? "Send" : "Contact Seller"} />
        </AppForm>
    );
}


export default ContactSellerForm;