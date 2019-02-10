import React from 'react';
import { TimePicker } from 'material-ui-pickers';

const RenderTimePicker = ({ input: { onChange, value }, label }) => (
    <TimePicker
        margin="normal"
        label={label}
        value={!value ? null : new Date(value)}
        onChange={onChange}
    />
)

export default RenderTimePicker;