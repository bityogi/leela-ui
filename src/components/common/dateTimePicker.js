import React from 'react';
import { DateTimePicker } from 'material-ui-pickers';
import { isEmpty } from 'lodash'
import moment from 'moment';

const renderDateTimePicker = ({ input: { onChange, value }, label, meta: { touched, error, warning }, initialFocusedDate }) => {
    const hasError = (!isEmpty(error) || !isEmpty(warning));
    const initialDateValue = isEmpty(initialFocusedDate) ? moment().startOf('hour').add(1, 'hours') : initialFocusedDate;
    
    return (
        <DateTimePicker
            disablePast
            margin="normal"
            label={label}
            value={!value ? null : new Date(value)}
            onChange={onChange}
            error={hasError}
            helperText={(error || warning)}
            allowKeyboardControl
            initialFocusedDate={initialDateValue}
        />
    )
}
   


export default renderDateTimePicker;