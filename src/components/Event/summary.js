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
import moment from 'moment';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { map } from 'lodash';

import styles from 'styles';
import { intervalPeriod } from 'components/common/util';

class Summary extends Component {

    render() {
        const { classes, values } = this.props;
        console.log('event values: ', values);
        const ip = intervalPeriod(values.frequency);
        
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
                      (values.eventImage.file) && (
                        <Grid item xs={12}>
                          <Typography variant="caption" gutterBottom color="primary">
                              Event Image
                          </Typography>
                          <Card className={classes.card}>
                              <CardActionArea>
                                <CardMedia
                                  className={classes.media}
                                  image={URL.createObjectURL(values.eventImage.file)}
                                  title="Event Image Card"
                                />
                              </CardActionArea>
                          </Card>
                        </Grid>
                      )
                    }
                    {
                      (values.altImage.file) && (
                        <Grid item xs={12}>
                          <Typography variant="caption" gutterBottom color="primary">
                              Alternate Event Image
                          </Typography>
                          <Card className={classes.card}>
                              <CardActionArea>
                                <CardMedia
                                  className={classes.media}
                                  image={URL.createObjectURL(values.altImage.file)}
                                  title="Event Image Card"
                                />
                              </CardActionArea>
                          </Card>
                        </Grid>
                      )
                    }
                    <Grid item xs={6}>
                      <Typography variant="caption" gutterBottom color="primary">
                            Start
                        </Typography>
                        <Typography variant="overline" gutterBottom>
                            {moment(values.start).format('MMMM Do YYYY, h:mm a')}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" gutterBottom color="primary">
                            End
                        </Typography>
                        <Typography variant="overline" gutterBottom>
                            {moment(values.end).format('MMMM Do YYYY, h:mm a')}
                        </Typography>
                    </Grid>
                    {
                      values.isRecurring === true && (
                        <Grid item xs={12}>
                          <Typography variant="caption" gutterBottom color="primary">
                                Recurrence
                            </Typography>
                            <Typography variant="overline" gutterBottom>
                              <FormattedMessage
                                    id="interval"
                                    defaultMessage={`Repeats {frequency}, every {interval, number} {interval, plural, one {${ip.singular}} other {${ip.plural}}} until {repeatUntil}`}
                                    values={{frequency: values.frequency, interval: values.interval, repeatUntil: moment(values.repeatUntil).format('MMMM Do YYYY, h:mm a')}}
                                />
                            </Typography>
                        </Grid>
                      )
                    }
                    {
                      values.hasSessions === true && (map(values.sessions, session => (
                        <Grid item xs={12} key={session.name}>
                          <Typography variant="caption" gutterBottom color="primary">
                              Session Name
                          </Typography>
                          <Typography variant="overline" gutterBottom>
                            {session.name}
                          </Typography>
                          <Grid item xs={6}>
                            <Typography variant="caption" gutterBottom color="primary">
                                Start
                            </Typography>
                            <Typography variant="overline" gutterBottom>
                              {moment(session.start).format('MMMM Do YYYY, h:mm a')}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" gutterBottom color="primary">
                                End
                            </Typography>
                            <Typography variant="overline" gutterBottom>
                              {moment(session.end).format('MMMM Do YYYY, h:mm a')}
                            </Typography>
                          </Grid>
                        </Grid>
                      ))
                        
                      )
                    }
                    {
                      (values.questions && values.questions.length > 0) && map(values.questions, question => (
                        <Grid item xs={12} key={question.index}>
                          <Typography variant="caption" gutterBottom color="primary">
                              Question
                          </Typography>
                          <Typography variant="overline" gutterBottom>
                            {question.text}
                          </Typography>
                          <Grid item xs={6}>
                            <Typography variant="caption" gutterBottom color="primary">
                                Type
                            </Typography>
                            <Typography variant="overline" gutterBottom>
                              {question.type}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" gutterBottom color="primary">
                                Is it required?
                            </Typography>
                            <Typography variant="overline" gutterBottom>
                              { (question.isRequired === true) ? 'Yes' : 'No' }
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" gutterBottom color="primary">
                                Will it affect price
                            </Typography>
                            <Typography variant="overline" gutterBottom>
                              { (question.affectPrice === true) ? 'Yes' : 'No' }
                            </Typography>
                          </Grid>
                        </Grid>
                     ))
                    }
                    <Grid item xs={6}>
                      <Typography variant="caption" gutterBottom color="primary">
                            Price
                        </Typography>
                        <Typography variant="overline" gutterBottom>
                          <FormattedNumber
                            value={values.price}
                            style='currency'
                            currency='USD'
                            minimumFractionDigits={2}
                            maximumFractionDigits={2}
                          />
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