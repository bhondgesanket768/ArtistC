import React, { useState } from 'react';
import ImageInput from '../ImageInput';
import { useFormikContext } from "formik"
import ErrorMessage from './ErrorMessage';

function ProfileImagePicker({ name }) {

    const [imageUri, setImgeUri] = useState("")

    const { setFieldValue, touched, errors, values } = useFormikContext();

    const addUri = (uri) => {
        setImgeUri(uri)
        setFieldValue(name, uri)
    }

    return (
        <React.Fragment>
            <ImageInput imageUri={imageUri} onChangeImage={addUri} />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </React.Fragment>
    );
}

export default ProfileImagePicker;