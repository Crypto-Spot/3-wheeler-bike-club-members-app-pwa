export function calculateScore(createdAt: string) {   
    //asumes UTC time and friday 12pm is the start of the week
    //ignore day of the week comment if start of week is different
    const memberInvoiceDate = new Date(createdAt);
    const currentDate = new Date();
    const diffInHours = Math.floor((currentDate.getTime() - memberInvoiceDate.getTime()) / (1000 * 60 * 60));
    
    // Grace period (72 hours from Friday 12PM UTC)
    if (diffInHours <= 72) {
        return 700; // Perfect score
    }
    
    // Calculate days since grace period ended
    const daysAfterGracePeriod = Math.floor((diffInHours - 72) / 24);
    
    switch (daysAfterGracePeriod) {
        case 0: // Monday -> Tuesday // less than 1 days late
            return 500;
        case 1: // Tuesday -> Wednesday // less than 2 days late
            return 400;
        case 2: // Wednesday -> Thursday // less than 3 days late
            return 300;
        case 3: // Thursday -> Friday // less than 4 days late
            return 200;
        default: // Late payment (after next Friday)
            return 25;
    }
};