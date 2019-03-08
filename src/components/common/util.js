export const intervalPeriod = (recurrenceType) => {
    let intervalPeriod = {
        singular : 'day',
        plural : 'days'
    }
    switch (recurrenceType) {
        case 'Weekly':
        intervalPeriod.singular = 'week';
        intervalPeriod.plural = 'weeks';
        break;

        case 'Monthly':
        intervalPeriod.singular = 'month';
        intervalPeriod.plural = 'months';
        break;

        case 'Yearly':
        intervalPeriod.singular = 'year';
        intervalPeriod.plural = 'years';
        break;

        default:
    }

    return intervalPeriod;
}