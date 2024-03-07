export function formatTime(uptime: number) {
    const playTimeHrs = Math.floor(uptime / 60);
    const playTimeMins = uptime % 60;

    return `${playTimeHrs ? playTimeHrs + "h" : ""} ${playTimeMins}m`;
}