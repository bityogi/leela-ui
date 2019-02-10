import React from 'react';
import { DatePicker } from 'material-ui-pickers';

const renderDatePicker = ({ input: { onChange, value }, showTime }) => (
    <DatePicker
        margin="normal"
        label="Start date"
        value={!value ? null : new Date(value)}
        onChange={onChange}
    />
)

export default renderDatePicker;