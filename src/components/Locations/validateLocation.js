import { LOCATION_TYPE } from 'util/enums';
import { isValidURL } from 'util/validate';
import { client } from 'util/axiosClient';

export default (values) => {
    let errors = {};

    if (!values.name) {
        errors.name = 'Required'
    }

   
    if (values.locationType === LOCATION_TYPE.Online.ordinal) {
        if (!values.url) {
            errors.url = 'Required'
        } else if (!isValidURL(values.url)) {
            errors.url = 'Invalid URL'
        }

    } else if (values.locationType === LOCATION_TYPE.Physical.ordinal) {
        if (!values.capacity) {
            errors.capacity = 'Required'
        } else if (values.capacity > 100000) {
            errors.capacity = 'Seems a bit much. Please select a value below 100,000'
        }
        
        if (!values.address1) {
            errors.address1 = 'Required'
        }
    
        if (!values.city) {
            errors.city = 'Required'
        }
    
        if (!values.zipcode) {
            errors.zipcode = 'Required'
        }
    } else (
        errors.locationType = 'Select either "Physical" or "Online"'
    )
    

    

    return errors;
}

export const validateName = ({ name }) => {
   

    return client.get(`/location/check/${name}`)
        .then(res => {
            console.log('response from location POST: ', res);
            
            return true
        })
        .catch(err => {
            console.log('error from location POST: ', err);
            // eslint-disable-next-line no-throw-literal
            throw { name: 'This name is not valid' }
        })
    
}
