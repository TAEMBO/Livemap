import icons from './iconList.js';
import { FSDSSVehicle } from 'src/typings.js';

export function getIcon(object: FSDSSVehicle) {
    let controller = icons[object.category.toLowerCase()];
    
    controller ??= icons[object.type.toLowerCase()];
    
    if (object.controller) controller = icons.controller;
    
    controller ??= icons.default;

    return controller;
}

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
