import { icons } from "./icons.js";
import { type Vehicle } from "farming-simulator-types/2022";

export function getIcon(object: Vehicle) {
    let controller = icons[object.category.toLowerCase()];
    
    controller ??= icons[object.type.toLowerCase()];
    
    if (object.controller) controller = icons.controller;
    
    controller ??= icons.default;

    return controller;
}