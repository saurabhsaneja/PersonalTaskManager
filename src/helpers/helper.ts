import moment from "moment";

export const getFont = (type: string) => {
    return 'Roboto-' + type
}
export function isFuture(dateString: string) {
    // Create a moment object for the time you want to check
    const timeToCheck = moment(dateString);

    // Create a moment object for the current time
    const now = moment();

    // Check if the time is in the future
    const isInFuture = timeToCheck.isAfter(now);
    return isInFuture
}