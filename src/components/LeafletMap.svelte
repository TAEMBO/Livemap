<script lang="ts">
    import { onMount } from "svelte";
    import { MAP_SIZE } from "$lib";
    import type { LeafletVehicle } from "../typings";
    import type { Marker } from "leaflet";

    export let vehicles: LeafletVehicle[];
    export let serverAcro: string;
    export let popupPairs: Map<string, Marker>;

    onMount(async () => {
        //eslint-disable-next-line @typescript-eslint/naming-convention
        const { CRS, GeoJSON, icon, imageOverlay, map, Marker } = await import("leaflet");
        const data = {
            type: "FeatureCollection",
            features: vehicles.map(vehicle => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [vehicle.posx, vehicle.posy]
                },
                properties: vehicle
            }))
        } as const;
        const leafletMap = map("map", { crs: CRS.Simple, maxZoom: 5 });
        const bounds: [number, number][] = [[-MAP_SIZE, -MAP_SIZE], [MAP_SIZE, MAP_SIZE]];

        imageOverlay(`/api/maps/${serverAcro}`, bounds).addTo(leafletMap);

        leafletMap
            .fitBounds(bounds)
            .setMaxBounds(bounds)
            .on("drag", () => leafletMap.panInsideBounds([
                [-(MAP_SIZE - 1), -(MAP_SIZE - 1)],
                [MAP_SIZE - 1, MAP_SIZE - 1]
            ], { animate: false }));

        // Clear previous popups from page navigating and trigger component reconstruction
        popupPairs = new Map<string, Marker>();

        new GeoJSON(data, {
            onEachFeature(_, layer) {
                if (!(layer instanceof Marker)) return;

                const { properties } = layer.feature! as { properties: LeafletVehicle; };
                
                const marker = layer
                    .bindPopup(properties.popup)
                    .setIcon(icon({
                        iconUrl: "/icons/" + properties.icon,
                        iconSize: [12, 12],
                        iconAnchor: [6, 6],
                        popupAnchor: [0, -10],
                    }));

                if (properties.controller) popupPairs.set(properties.controller, marker);
            },
        }).addTo(leafletMap);

        return {
            destroy: () => {
                leafletMap.remove();
            }
        };
    });
</script>

<div class="col-xl-auto">
    <div
        id="map"
        class="leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
        tabIndex={0}
    ></div>
</div>
