import type { Vehicle } from "farming-simulator-types/2025";

export function getIconPopup(vehicle: Vehicle) {
    let popupHTML = `<b>${vehicle.name}</b><small>`;

    // Filter irrelevant fills, if any
    const fillData = !vehicle.fills
        ? null
        : vehicle.fills.filter(fill => !["DIESEL", "DEF", "AIR"].includes(fill.type));

    if (fillData && fillData.length) { // Equipment has relevant fills
        if (fillData.some(fill => fill.type === "UNKNOWN") && fillData.length === 1) { // Empty fill
            popupHTML += "<br>Empty";
        } else { // Valid & relevant fill data
            popupHTML += fillData.filter(fill => fill.type !== "UNKNOWN").map(fill => {
                return `<br><span style="text-transform: capitalize;">${fill.type.toLowerCase()}</span> (${fill.level.toLocaleString("en-US")})`;
            }).join("");
        }
    }

    if ("controller" in vehicle) popupHTML += `<br>Player: ${vehicle.controller}`;

    popupHTML += "</small>";

    return popupHTML;
}