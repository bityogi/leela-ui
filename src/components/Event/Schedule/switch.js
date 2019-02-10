import React from 'react';
import Switch from '@material-ui/core/Switch';

const RenderSwitch = ({ input: { onChange, value }, label, checked }) => (
    <Switch
        checked={checked}
        label={label}
        value={!value ? false : value}
        onChange={onChange}
    />
)

export default RenderSwitch;