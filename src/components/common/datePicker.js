import React from 'react';
import { DatePicker } from 'material-ui-pickers';
import { isEmpty } from 'lodash';
import moment from 'moment';

const renderDatePicker = ({ input: { onChange, value }, label, meta: { touched, error, warning }, initialFocusedDate, maxDate }) => {
    const hasError = (!isEmpty(error) || !isEmpty(warning));
    const initialDateValue = isEmpty(initialFocusedDate) ? moment() : initialFocusedDate;
  
    return (
        <DatePicker
            margin="normal"
            label={label}
            value={!value ? null : new Date(value)}
            onChange={onChange}
            error={hasError}
            helperText={(error || warning)}
            allowKeyboardControl
            disablePast
            initialFocusedDate={initialDateValue}
            maxDate={maxDate}
        />
    )
}

export default renderDatePicker;