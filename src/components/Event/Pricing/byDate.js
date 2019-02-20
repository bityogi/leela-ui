import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'redux-form-material-ui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from 'styles';
import DatePicker from 'components/common/datePicker';

const validate = values => {
    const errors = {}

    if (!values.sessionName) {
        errors.sessionName = 'byDate'
    }

    return errors;
}

export default ({ fields, meta: { error, submitFailed }, classes }) => (
    <Grid item container xs={12}>
    
        {fields.map((byDate, index) => (
            <Grid key={index}>
                <Grid item xs={12}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        From Date
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        <Field 
                            component={DatePicker} 
                            name={`${byDate}.from`}
                        />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        By Date
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <Field 
                            component={DatePicker} 
                            name={`${byDate}.till`}
                        />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                        Price
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <Field 
                            component={TextField} 
                            name={`${byDate}.price`}
                        />
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Button 
                        variant="outlined" 
                        size="small" 
                        className={classes.inlineButton} 
                        onClick={() => fields.remove(index)}
                    >
                        Remove
                    </Button>
                </Grid>
            </Grid>
        ))}

        <Grid item xs={12}>
            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => fields.push({ index: fields.length })}>
                    Add Price By Date
                </Button>
                {submitFailed && error && <span>{error}</span>}
            </Typography>
        </Grid>
    </Grid>
)


// class ByDate extends Component {

//     handleFormSubmit = (values) => {
//         const { onByDatePricingAdded, byDate } = this.props;
//         onByDatePricingAdded(values, byDate);
//     }

//     render() {
//         const {  classes, pristine, submitting, handleSubmit } = this.props;

//         return (
//             <form onSubmit={handleSubmit(this.handleFormSubmit)}>
//                 <Grid item xs={12}>
//                     <Grid item xs={12}>
//                         <Grid item xs={12}>
//                             <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
//                                 From Date
//                             </Typography>
//                             <Typography variant="h3" gutterBottom>
//                                 <Field 
//                                     component={DatePicker} 
//                                     name={`fromDate`}
//                                     style={{ width:'80%', fontSize: '.9em' }}
//                                 />
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
//                                 By Date
//                             </Typography>
//                             <Typography variant="h3" gutterBottom>
//                                 <Field 
//                                     component={DatePicker} 
//                                     name={`byDate`}
//                                     style={{ width:'80%', fontSize: '.9em' }}
//                                 />
//                             </Typography>
//                         </Grid>
//                         <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
//                             Price
//                         </Typography>
//                         <Typography variant="h3" gutterBottom>
//                             <Field 
//                                 component={TextField} 
//                                 name={`price`}
//                                 style={{ width:'80%', fontSize: '.9em' }}
//                             />
//                         </Typography>
//                     </Grid>
                    
                    
//                     <div className={classes.flexBar}>
                   
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         disabled={ pristine || submitting }
//                       >
//                         Add
//                       </Button>
                    
//                         <Button 
//                             variant="contained"
//                             color="primary"
//                             className={classes.backButton}
//                             disabled={ pristine || submitting }
//                         >
//                          Clear
//                         </Button>
//                   </div>

//                 </Grid>
//             </form>
            
//         );
//     }
// }

// ByDate = reduxForm({
//     form: 'byDateForm',
//     validate,
// })(ByDate)

// export default withStyles(styles)(ByDate);

