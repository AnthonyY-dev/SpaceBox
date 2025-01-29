export default function(isoDate: string | null | undefined): string {
    if(isoDate == null || isoDate == undefined){
        return ""
    }
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) {
        throw new Error("Invalid ISO date string");
    }

    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${month}/${day}/${year}`;
}