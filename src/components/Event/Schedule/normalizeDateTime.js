
const normalizeStartDate = (value, previousValue, allValues) => {
    console.log('normalizing start date')
    if (!value) {
        return { value, previousValue, allValues }
    }

    
    allValues.startDate = new Date(allValues.startDate).setHours(new Date(value).getHours());
    
    return {
        value, previousValue, allValues
    }
}

export { normalizeStartDate };