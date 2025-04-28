<script lang="ts">
    import List from "../components/List.svelte";
    import ListItem from "../components/ListItem.svelte";
    import type { ListsHelperSettings } from "../typings";

    export let data: ListsHelperSettings;
</script>

<List title="Helper Settings">
    <ListItem name="Refill - Fuel" value={data.helperBuyFuel} />
    <ListItem name="Refill - Seeds" value={data.helperBuySeeds} />
    <ListItem name="Refill - Fertilizer" value={data.helperBuyFertilizer} />
    <ListItem name="Refill - Slurry" value={data.helperSlurrySource} />
    <ListItem name="Refill - Manure" value={data.helperManureSource} />
</List>
