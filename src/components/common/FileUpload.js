import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import styles from 'styles';
import { uploadFile } from 'actions';

class FileUpload extends React.Component {
   state = {
     fileUploaded : [],
   }

   onDrop = (acceptedFiles, rejectedFiles) => {
     const { input : { onChange }, uploadFile } = this.props;
     console.log('files received: ', acceptedFiles);
     if (acceptedFiles.length > 0) {
        uploadFile(acceptedFiles[0])
          .then(res => {
            console.log('response from upload-file POST: ', res);
          })
          .catch(err => {
            console.error('error from upload-file POST: ', err);
          })
        onChange([acceptedFiles[0]]);
     }
   }

   onRemove = () => {
     const { input: { onChange } } = this.props;
     console.log('removing file')
     onChange([]);
   }

   render() {
    const { classes, input : { value }, name, meta : { touched, error } } = this.props;
 
    if (value.length > 0) {
      return (
        <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={URL.createObjectURL(value[0])}
            title="Event Name"
          />
          <CardActions>
        
        <Button size="small" color="primary" onClick={this.onRemove}>
          Remove
        </Button>
      </CardActions>

        </CardActionArea>
      </Card>
      )
      
    } else {
      return (
        <div>
          <Dropzone 
            onDrop={this.onDrop}
            name={name}
            multiple={false}
          >
            {({getRootProps, getInputProps, isDragActive}) => {
              return (
                <div
                  {...getRootProps()}
                  className={classNames('dropzone', {'dropzone--isActive': isDragActive}, classes.media)}
                >
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p>Drop files here...</p> :
                      <p>Try dropping some files here, or click to select files to upload.</p>
                  }
                </div>
              )
            }}
          </Dropzone>
          { touched && error && <span className="error">{error}</span> }
        </div>
        
      );
    }
    
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  uploadFile,
}, dispatch)

const enhance = compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
)

export default enhance(FileUpload);