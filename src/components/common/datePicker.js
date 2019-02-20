import React from 'react';
import { DatePicker } from 'material-ui-pickers';


const renderDatePicker = ({ input: { onChange, value }, label, meta: { touched, error, warning } }) => (
    <DatePicker
        margin="normal"
        label={label}
        value={!value ? null : new Date(value)}
        onChange={onChange}
        error={(touched && (error || warning))}
        helperText={(error || warning)}
    />
)

export default renderDatePicker;