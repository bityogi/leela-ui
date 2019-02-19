import React from 'react';
import { DatePicker } from 'material-ui-pickers';


const renderDatePicker = ({ input: { onChange, value }, label, meta: { touched, error, warning } }) => (
    <DatePicker
        margin="normal"
        label={label}
        value={!value ? null : new Date(value)}
        onChange={onChange}
        helperText={(touched && (error || warning)) ? (error || warning) : null}
    />
)

export default renderDatePicker;