export function isBetweenDates(startDateStr: string, endDateStr: string) {
    const currentDate = new Date(); // Current date and time
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    return currentDate >= startDate && currentDate <= endDate;
}