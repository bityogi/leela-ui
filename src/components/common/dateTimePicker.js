import React from 'react';
import { DateTimePicker } from 'material-ui-pickers';
import { isEmpty } from 'lodash'

const renderDateTimePicker = ({ input: { onChange, value }, label, meta: { touched, error, warning } }) => {
    const hasError = (!isEmpty(error) || !isEmpty(warning));
    return (
        <DateTimePicker
            disablePast
            margin="normal"
            label={label}
            value={!value ? null : new Date(value)}
            onChange={onChange}
            error={hasError}
            helperText={(error || warning)}
        />
    )
}
   


export default renderDateTimePicker;