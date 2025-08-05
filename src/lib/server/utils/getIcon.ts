import type { Vehicle } from "farming-simulator-types/2025";
import { icons } from "./icons";

export function getIcon(object: Vehicle) {
    let icon = icons[object.category.toLowerCase()];

    icon ??= icons[object.type.toLowerCase()];

    if ("controller" in object) icon = object.controller?.length ? icons.controller : icons.controllerghost;

    icon ??= icons.default;

    return icon;
}