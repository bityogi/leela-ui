import React, { Component } from 'react';

class FileUpload extends Component {
    constructor (props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const { input: { onChange } } = this.props;
        onChange(e.target.files[0])
    }

    render() {
        const { label} = this.props;
        return (
            <div>
                <label>{label}</label>
                <input
                    type='file'
                    accept='.jpg, .png, .jpeg'
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

export default FileUpload;