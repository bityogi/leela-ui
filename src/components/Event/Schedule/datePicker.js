import React from 'react';
import { DatePicker } from 'material-ui-pickers';

const renderDatePicker = ({ input: { onChange, value }, label }) => (
    <DatePicker
        margin="normal"
        label={label}
        value={!value ? null : new Date(value)}
        onChange={onChange}
    />
)

export default renderDatePicker;