import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import styles from 'styles';

class Summary extends Component {

    render() {
        const { classes, values } = this.props;
        console.log('event values: ', values);
        console.log('event image: ', values.eventImage[0]);

        return (
            <div className={classes.bigContainer}>
              <Paper className={classes.paper}>
                <div>
                  <div style={{marginBottom: 32}}>
                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                      Event Summary
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Please review event details
                    </Typography>
                  </div>
                  <Grid item container xs={12}>
                    <Grid item xs={6}>
                      <Typography variant="caption" gutterBottom color="primary">
                            Title
                        </Typography>
                        <Typography variant="overline" gutterBottom>
                            {values.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" gutterBottom color="primary">
                            Location
                        </Typography>
                        <Typography variant="overline" gutterBottom>
                            {values.location}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" gutterBottom color="primary">
                            Description
                        </Typography>
                        <Typography variant="overline" gutterBottom>
                            {values.description}
                        </Typography>
                    </Grid>
                    {
                      values.eventImage.length > 0 && (
                        <Grid item xs={12}>
                          <Typography variant="caption" gutterBottom color="primary">
                                Event Image
                            </Typography>
                            <Typography variant="overline" gutterBottom>
                              <Card className={classes.card}>
                                <CardActionArea>
                                  <CardMedia
                                    className={classes.media}
                                    image={values.eventImage[0]}
                                    title="Event Image"
                                  />
                                </CardActionArea>
                              </Card>
                                
                            </Typography>
                        </Grid>
                      )
                    }
                    <Grid item xs={6}>
                      <Typography variant="caption" gutterBottom color="primary">
                            Start
                        </Typography>
                        <Typography variant="overline" gutterBottom>
                            {values.start.toString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" gutterBottom color="primary">
                            End
                        </Typography>
                        <Typography variant="overline" gutterBottom>
                            {values.end.toString()}
                        </Typography>
                    </Grid>


                    
                  </Grid>
                  
                </div>
              </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  values: getFormValues('event')(state),
})

const enhance = compose(
  connect(mapStateToProps, null),
  withStyles(styles),
)

export default enhance(Summary);