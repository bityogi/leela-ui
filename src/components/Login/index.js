import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


import styles from 'styles';
import validateLogin from './validateLogin';
import { login } from 'actions';

class Login extends Component {

 
  handleLogin = (values) => {
    const { login } = this.props;
    login(values);
  }

  render() {

    const { classes, handleSubmit } = this.props;

    return (
     
        <div className={classes.root}>
     
          <Grid container justify="center"> 
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                
                <form onSubmit={handleSubmit(this.handleLogin)}>
                 
                  
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <div>
                        <div style={{marginBottom: 32}}>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            Login
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Enter your credentials
                          </Typography>
                        </div>
                        <Grid item xs={12}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                Username
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field name="username" component={TextField}  />
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                                Password
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <Field name="password" component={TextField}  />
                            </Typography>
                        </Grid>
                        
                      </div>
                    </Paper>
                    </div>
                 
                  
                     <div className={classes.buttonBar}>
                     
                        <Button
                            className={classes.backButton}
                            size='large'
                        >
                            Reset
                        </Button>
                     
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            size='large'
                            disabled={false}
                        >
                            Login
                        </Button>
                    </div> 
                  
                  
                </form>
              </Grid>
            </Grid>
          </Grid>
        </div>
      
    )
  }
}

Login = reduxForm({
    form: 'login',
    validate: validateLogin,
    initialValues: { username: 'test1User', password: 'password' },
    warn: () => {},
})(Login)

const mapDispatchToProps = dispatch => bindActionCreators({
    login,
  }, dispatch)

const enhance = compose(
    withStyles(styles),
    connect(null, mapDispatchToProps),
)
export default enhance(Login)