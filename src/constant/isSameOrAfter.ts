export const isSameOrAfter = (date1: string, date2: string) => {
    // Parse the dates (assuming "DD-MM-YYYY" format)
    const [day1, month1, year1] = date1.split('-').map(Number);
    const [day2, month2, year2] = date2.split('-').map(Number);

    const firstDate = new Date(year1, month1 - 1, day1); // Months are 0-based in JavaScript
    const secondDate = new Date(year2, month2 - 1, day2);

    // Compare the dates
    if (firstDate.toDateString() === secondDate.toDateString() || firstDate > secondDate) {
        return true
    } else {
        return false
    }
};
