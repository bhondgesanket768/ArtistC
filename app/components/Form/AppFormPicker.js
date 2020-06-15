import React from 'react';
import { useFormikContext } from "formik"
import AppPicker from '../AppPicker';
import ErrorMessage from './ErrorMessage';

function AppFormPicker({ items, name, placeholder, width, PickerItemComponent, numberOfColumns }) {

    const { setFieldValue, touched, errors, values } = useFormikContext();

    return (
        <React.Fragment>
            <AppPicker
                items={items}
                onSelectItem={item => setFieldValue(name, item)}
                placeholder={placeholder}
                PickerItemComponent={PickerItemComponent}
                selected={values[name]}
                width={width}
                numberOfColumns={numberOfColumns}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </React.Fragment>
    );
}

export default AppFormPicker;