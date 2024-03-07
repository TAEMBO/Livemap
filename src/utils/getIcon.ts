import { icons } from "./icons.js";
import { FSDSSVehicle } from "../typings.js";

export function getIcon(object: FSDSSVehicle) {
    let controller = icons[object.category.toLowerCase()];
    
    controller ??= icons[object.type.toLowerCase()];
    
    if (object.controller) controller = icons.controller;
    
    controller ??= icons.default;

    return controller;
}