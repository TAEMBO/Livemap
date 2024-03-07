export function formatNumber(number: number, icon: string) {
    return number.toLocaleString(undefined, { minimumFractionDigits: 0 }) + icon;
}