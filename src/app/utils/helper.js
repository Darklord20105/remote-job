export function calculateDayDifference(date) {
    const dateInDays = new Date(date);
    const currentDate = new Date();
    const difference = currentDate - dateInDays
    return Math.round(difference / (1000 * 3600 * 24));
}
