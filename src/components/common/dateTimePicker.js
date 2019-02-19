import React from 'react';
import { DateTimePicker } from 'material-ui-pickers';


const renderDateTimePicker = ({ input: { onChange, value }, label, meta: { touched, error, warning } }) => {
    return (
        <DateTimePicker
            disablePast
            margin="normal"
            label={label}
            value={!value ? null : new Date(value)}
            onChange={onChange}
            error={(touched && (error || warning))}
            helperText={(error || warning)}
        />
    )
}
   


export default renderDateTimePicker;