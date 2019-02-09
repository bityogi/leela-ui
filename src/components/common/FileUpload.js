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
     console.log('files received: ', acceptedFiles);
     if (acceptedFiles.length > 0) {
       const uploadedFile = URL.createObjectURL(acceptedFiles[0]);
       this.setState({ fileUploaded : [uploadedFile] });
     }
   }

   render() {
    if (this.state.fileUploaded.length > 0) {
      const { classes } = this.props;
      return (
        <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={this.state.fileUploaded[0]}
            title="Event Name"
          />

        </CardActionArea>
      </Card>
      )
      
    } else {
      return (
        <Dropzone onDrop={this.onDrop}>
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <div
                {...getRootProps()}
                className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
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
      );
    }
    
  }
}

export default withStyles(styles)(FileUpload);