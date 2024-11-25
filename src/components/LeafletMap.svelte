<script lang="ts">
    import { onMount } from "svelte";
    import { MAP_SIZE } from "$lib";

    export let serverAcro: string;

    onMount(async () => {
        //eslint-disable-next-line @typescript-eslint/naming-convention
        const { CRS, GeoJSON, icon, imageOverlay, map, Marker } = await import("leaflet");
        const data = await fetch(`/api/geojson/${serverAcro}`).then(x => x.json());
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

        new GeoJSON(data, {
            onEachFeature(_, layer) {
                if (!(layer instanceof Marker)) return;

                const { properties } = layer.feature!;

                layer
                    .bindPopup(properties.popup)
                    .setIcon(icon({
                        iconUrl: "/icons/" + properties.icon.icon,
                        iconSize: [properties.icon.dimension, properties.icon.dimension],
                        iconAnchor: [properties.icon.dimension / 2, properties.icon.dimension / 2],
                        popupAnchor: [0, -10],
                    }));
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
        style="height: {MAP_SIZE}px; width: {MAP_SIZE}px;"
        class="leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
        tabIndex={0}
    />
</div>
