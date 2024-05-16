<script lang="ts">
    import List from "../components/List.svelte";
    import ListItem from "../components/ListItem.svelte";
    import type { ListsServerDetails } from "../typings";

    export let data: ListsServerDetails;
</script>

<List title="Server Details">
    <ListItem><b>Money</b><span class="float-end">{data.csg.money}</span></ListItem>
    <ListItem><b>Game Difficulty</b><span class="float-end">{data.csg.difficulty}</span></ListItem>
    <ListItem><b>Console Slots</b><span class="float-end">{data.csg.slotUsage}</span></ListItem>
    <ListItem><b>Savegame Name</b><span class="float-end">{data.csg.savegameName}</span></ListItem>
    <ListItem><b>Creation Date</b><span class="float-end">{data.csg.creationDate}</span></ListItem>
    <ListItem><b>Map</b><span class="float-end">{data.csg.mapTitle}</span></ListItem>
    <ListItem><b>Map size</b><span class="float-end">{data.dss.server.mapSize}</span></ListItem>
    <ListItem><b>Game Version</b><span class="float-end">{data.dss.server.version}</span></ListItem>
    <ListItem><b>Timescale</b><span class="float-end">{data.csg.timeScale}</span></ListItem>
    <ListItem><b>Autosave Interval</b><span class="float-end">{data.csg.saveInterval}</span></ListItem>
    <ListItem><b>Economy Difficulty</b><span class="float-end">{data.csg.economicDifficulty}</span></ListItem>
    <ListItem><b>Fixed Visual Month</b><span class="float-end">{data.csg.fixedSeasonalVisuals}</span></ListItem>
    <ListItem><b>Growth Mode</b><span class="float-end">{data.csg.growthMode}</span></ListItem>
    <ListItem><b>Fuel Usage</b><span class="float-end">{data.csg.fuelUsage}</span></ListItem>
    <ListItem><b>Dirt Setting</b><span class="float-end">{data.csg.dirtInterval}</span></ListItem>
    <ListItem><b>Plowing Required</b><span class="float-end">{data.csg.plowingRequiredEnabled}</span></ListItem>
    <ListItem><b>Automatic Motor Start</b><span class="float-end">{data.csg.automaticMotorStartEnabled}</span></ListItem>
    <ListItem><b>Crop Destruction</b><span class="float-end">{data.csg.fruitDestruction}</span></ListItem>
</List>
