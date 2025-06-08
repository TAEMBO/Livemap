import type { Vehicle } from "farming-simulator-types/2025";
import { icons } from "./icons";

export function getIcon(object: Vehicle) {
    let icon = icons[object.category.toLowerCase()];

    icon ??= icons[object.type.toLowerCase()];

    if (object.controller) icon = icons.controller;

    icon ??= icons.default;

    return icon;
}