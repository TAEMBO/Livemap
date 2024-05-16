import { json } from "@sveltejs/kit";
import { cachedVehicles } from "$lib";

export function GET(requestEvent) {
    const { params: { serverAcro } } = requestEvent;

    return json({
        type: "FeatureCollection",
        features: cachedVehicles[serverAcro].map(vehicle => ({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [vehicle.posx, vehicle.posy]
            },
            properties: vehicle
        }))
    });
}