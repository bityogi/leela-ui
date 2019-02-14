
const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = 'Required'
    }

    if (!values.location) {
        errors.location = 'Required'
    }

    if (!values.description) {
        errors.description = 'Required'
    }

    if (values.eventImage) {
        if (values.eventImage.length === 0) {
            errors.eventImage = 'Required'
        }
    }
    
    if (!values.startDate) {
        errors.startDate = 'Required'
    }

    if (!values.startTime) {
        errors.startTime = 'Required'
    }

    if (!values.endDate) {
        errors.endDate = 'Required'
    }

    if (!values.endTime) {
        errors.endTime = 'Required'
    }

    if (values.startDate && values.startTime && values.endDate && values.endTime) {
        console.log('startDate: ', values.startDate)
        console.log('startTime: ', values.startTime)
        
    }

    return errors;
}

export default validate;