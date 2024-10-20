export function getFridayFromYearWeek (week: number, year: number ) {
    // Create a new date object for the 1st day of the year
    const firstDayOfYear = new Date(Date.UTC(year, 0, 1));

    // Get the ISO week day of January 1st (1 = Monday, 7 = Sunday)
    const dayOfWeek = firstDayOfYear.getUTCDay() || 7;

    // Calculate the first Thursday of the year
    const firstThursday = new Date(firstDayOfYear);
    firstThursday.setUTCDate(firstDayOfYear.getUTCDate() + (4 - dayOfWeek));

    // Calculate the exact date of the start of the given ISO week
    const weekStartDate = new Date(firstThursday);
    weekStartDate.setUTCDate(firstThursday.getUTCDate() + 7 * (week - 1));

    // Find the Friday of that week
    const fridayOfWeek = new Date(weekStartDate);
    fridayOfWeek.setUTCDate(weekStartDate.getUTCDate() + (5 - fridayOfWeek.getUTCDay()));

    return fridayOfWeek;
};

