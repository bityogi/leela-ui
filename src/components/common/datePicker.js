import React from 'react';
import { DatePicker } from 'material-ui-pickers';

// import createComponent from 'util/createComponent';
// import mapError from 'util/mapError';

// export default createComponent(DatePicker, ({
//     input: { onBlur, ...inputProps },
//     defaultDate,
//     onChange,
//     ...props
// }) => ({
//     ...inputProps,
//     ...mapError(props),
//     onChange: (event, value) => {
//         inputProps.onChange(value)
//         if (onChange) {
//             onChange(value)
//         }
//     }
// }))

const renderDatePicker = ({ input: { onChange, value }, label }) => (
    <DatePicker
        margin="normal"
        label={label}
        value={!value ? null : new Date(value)}
        onChange={onChange}
    />
)

export default renderDatePicker;