export function formatGameTime(dayTime: number) {
    return Math.floor(dayTime / 3_600 / 1_000).toString().padStart(2, "0")
        + ":"
        + Math.floor((dayTime / 60 / 1_000) % 60).toString().padStart(2, "0");
}