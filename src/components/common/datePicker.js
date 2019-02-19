import React from 'react';
import { DatePicker } from 'material-ui-pickers';

// import createComponent from 'components/util/createComponent';
// import mapError from 'components/util/mapError';

// export default createComponent(DatePicker, ({
//     input: { onBlur, value, ...inputProps },
//     defaultDate,
//     onChange,
//     ...props
// }) => ({
//     ...inputProps,
//     ...mapError(props),
//     onChange: (event, value) => {
//         const valueInDate = new Date(value);
//         inputProps.onChange(valueInDate)
//         if (onChange) {
//             onChange(valueInDate)
//         }
//     },
//     value: new Date(value)
// }))

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