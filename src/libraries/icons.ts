import icons from './iconList.js';
import { FSDSSVehicle } from 'src/typings.js';

function getIcon(object: FSDSSVehicle) {
    if ('controller' in object) return icons['controller']
    else if (icons.hasOwnProperty(object.category.toLowerCase())) return icons[object.category.toLowerCase() as keyof typeof icons]
    else if (icons.hasOwnProperty(object.type.toLowerCase())) return icons[object.type.toLowerCase() as keyof typeof icons]

    return icons['default']
}

function getIconPopup(vehicle: FSDSSVehicle) {
    let popup = `<b>${vehicle.name}</b><small>`;

    const fillData = !vehicle.fills ? null : vehicle.fills.filter(fill => !["UNKNOWN", "DIESEL", "DEF", "AIR"].includes(fill.type));

    if (fillData && !fillData.length) {
        popup += "<br>Empty";
    } else if (fillData) {
        popup += fillData.map(x => {
            return `<br><span style="text-transform: capitalize;">${x.type.toLowerCase()}</span> (${x.level.toLocaleString('en-US')})`;
        }).join("");
    }

    if (vehicle.controller) popup += `<br>Player: ${vehicle.controller}`;

    popup += '</small>';

    return popup;
}

export {
    getIcon,
    getIconPopup
}