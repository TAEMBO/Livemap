import { FSDSSVehicle } from "../typings.js";

export function getIconPopup(vehicle: FSDSSVehicle) {
    let popupHTML = `<b>${vehicle.name}</b><small>`;

    // Filter irrelevant fills, if any
    const fillData = !vehicle.fills
        ? null
        : vehicle.fills.filter(fill => !["DIESEL", "DEF", "AIR"].includes(fill.type));

    if (fillData && fillData.length) { // Equipment has relevant fills
        if (fillData.some(fill => fill.type === "UNKNOWN")) { // Empty fill
            popupHTML += "<br>Empty";
        } else { // Valid & relevant fill data
            popupHTML += fillData.map(fill => {
                return `<br><span style="text-transform: capitalize;">${fill.type.toLowerCase()}</span> (${fill.level.toLocaleString('en-US')})`;
            }).join("");
        }
    }

    if (vehicle.controller) popupHTML += `<br>Player: ${vehicle.controller}`;

    popupHTML += '</small>';

    return popupHTML;
}