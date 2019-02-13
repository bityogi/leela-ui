import React from 'react'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
// import classes from '*.module.css';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  }
}

class FileUpload extends React.Component {
   state = {
     fileUploaded : [],
   }

   onDrop = (acceptedFiles, rejectedFiles) => {
     const { input : { onChange } } = this.props;
     console.log('files received: ', acceptedFiles);
     if (acceptedFiles.length > 0) {
       const uploadedFile = URL.createObjectURL(acceptedFiles[0]);
       onChange([uploadedFile])
     }
   }

   render() {
    const { classes, input : { value }, name, meta : { touched, error } } = this.props;
    console.log('touched: ', touched);
    console.log('error: ', error);

    if (value.length > 0) {
      return (
        <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={value[0]}
            title="Event Name"
          />

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

export default withStyles(styles)(FileUpload);