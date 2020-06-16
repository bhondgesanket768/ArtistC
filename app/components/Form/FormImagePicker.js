import React from 'react';
import ImageInputList from '../ImageInputList';
import { useFormikContext } from "formik"
import ErrorMessage from './ErrorMessage';

function FormImagePicker({ name }) {

    const { setFieldValue, touched, errors, values } = useFormikContext();

    const handleAdd = (uri) => {
        setFieldValue(name, [...values[name], uri]);
    }

    const handleRemove = (uri) => {
        const newUris = values[name].filter(uris => uris !== uri);
        setFieldValue(name, newUris)
    }

    return (
        <React.Fragment>
            <ImageInputList
                imageUris={values[name]}
                onRemoveImage={handleRemove}
                OnAddImage={handleAdd}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </React.Fragment>
    );
}

export default FormImagePicker;