import React from 'react';
import { TimePicker } from 'material-ui-pickers';

const RenderTimePicker = ({ input: { onChange, value }, label, meta : { touched, error } }) => (
    <div>
         <TimePicker
            margin="normal"
            label={label}
            value={!value ? null : new Date(value)}
            onChange={onChange}
        />
        { touched && error && (
            <span className="error">{error}</span>
        )}

    </div>
   
)

export default RenderTimePicker;