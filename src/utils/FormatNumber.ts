// Format the number for display
export function FormatNumber(value: number) {
    if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'k';
    } else {
        return value;
    }
}