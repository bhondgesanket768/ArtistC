import React, { useState, useEffect } from 'react';
import ImageInput from '../ImageInput';
import { useFormikContext } from "formik"
import ErrorMessage from './ErrorMessage';

function ProfileImagePicker({ name, initialValue, profile }) {

    const [imageUri, setImgeUri] = useState("")

    const { setFieldValue, touched, errors, values } = useFormikContext();

    useEffect(() => {
        if (initialValue) {
            setImgeUri(initialValue)
        }
    }, [])

    const addUri = (uri) => {
        setImgeUri(uri)
        setFieldValue(name, uri)
    }

    return (
        <React.Fragment>
            <ImageInput imageUri={imageUri} onChangeImage={addUri} profile />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </React.Fragment>
    );
}

export default ProfileImagePicker;