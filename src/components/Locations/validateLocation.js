import { LOCATION_TYPE } from 'util/enums';

export default (values) => {
    let errors = {};

    if (!values.name) {
        errors.name = 'Required'
    }

    if (!values.locationType) {
        errors.locationType = 'Required'
    } else {
        if (values.locationType === LOCATION_TYPE.Online.ordinal) {
            if (!values.url) {
                errors.url = 'Required'
            }

        } else if (values.locationType === LOCATION_TYPE.Physical.ordinal) {
            if (!values.address1) {
                errors.address1 = 'Required'
            }
        
            if (!values.city) {
                errors.city = 'Required'
            }
        
            if (!values.zipcode) {
                errors.zipcode = 'Required'
            }
        }
    }

    

    return errors;
}