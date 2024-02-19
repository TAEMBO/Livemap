import icons from './iconList.js';
import { FSDSSVehicle } from 'src/typings.js';

export function getIcon(object: FSDSSVehicle) {
    if ('controller' in object) return icons.controller
    else if (icons.hasOwnProperty(object.category.toLowerCase())) return icons[object.category.toLowerCase() as keyof typeof icons]
    else if (icons.hasOwnProperty(object.type.toLowerCase())) return icons[object.type.toLowerCase() as keyof typeof icons]

    return icons['default']
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
