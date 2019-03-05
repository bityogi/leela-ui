import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { forEach } from 'lodash';

class RenderValues extends Component {

    renderValues = () => {
        const { renderObject } = this.props;
        
        let renderString = '';
        forEach(renderObject, (value, key) => {
            renderString+= `${key} : ${value};`
        });

        return renderString.split(';').map(i => {
            return <p key={i}>{i}</p>
        });
    }

    render() {
        const { isError } = this.props;
        return (
            <div>
                <Typography variant="caption" gutterBottom color={isError ? 'error' : 'default'}>
                    {this.renderValues()}
                </Typography>
            </div>
        )
    }
}

export default RenderValues;