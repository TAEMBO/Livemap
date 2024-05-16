<script lang="ts">
    import List from "../components/List.svelte";
    import ListItem from "../components/ListItem.svelte";
    import type { ListsHelperSettings } from "../typings";

    export let data: ListsHelperSettings;
</script>

<List title="Helper Settings">
    <ListItem>
        <b>Buy Fuel</b>
        <span class="float-end">{data.helperBuyFuel}</span>
    </ListItem>
    <ListItem>
        <b>Buy Seeds</b>
        <span class="float-end">{data.helperBuySeeds}</span>
    </ListItem>
    <ListItem>
        <b>Buy Fertilizer</b>
        <span class="float-end">{data.helperBuyFertilizer}</span>
    </ListItem>
    <ListItem>
        <b>Slurry Source</b>
        <span class="float-end">{data.helperSlurrySource}</span>
    </ListItem>
    <ListItem>
        <b>Manure Source</b>
        <span class="float-end">{data.helperManureSource}</span>
    </ListItem>
</List>
