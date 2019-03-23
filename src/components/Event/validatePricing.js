
export default (values) => {
    const errors = {};

    if (!values.price) {
        errors.price = 'Required'
    }

    return errors;
}