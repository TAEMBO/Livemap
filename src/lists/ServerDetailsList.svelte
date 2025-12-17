<script lang="ts">
    import { formatGameTime } from "$lib";
    import List from "../components/List.svelte";
    import ListItem from "../components/ListItem.svelte";
    import type { ListsServerDetails } from "../typings";

    export let data: ListsServerDetails;
</script>

<List title="Server Details">
    <ListItem name="Money" value={data.csg.money} />
    <ListItem name="Console Slots" value={data.csg.slotUsage} />
    <ListItem name="Savegame Name" value={data.csg.savegameName} />
    <ListItem name="Creation Date" value={data.csg.creationDate} />
    <ListItem name="Map Name" value={data.csg.mapTitle} />
    <ListItem name="Map Size" value={(data.dss.server.mapSize / 1024).toString() + "X"} />
    <ListItem name="Game Version" value={data.dss.server.version || "Unknown"} />
    <ListItem name="In-game Time" value={formatGameTime(data.dss.server.dayTime)} />
    <ListItem name="Timescale" value={data.csg.timeScale} />
    <ListItem name="Autosave Interval" value={data.csg.saveInterval} />
    <ListItem name="Economy Difficulty" value={data.csg.economicDifficulty} />
    <ListItem name="Fixed Visual Month" value={data.csg.fixedSeasonalVisuals} />
    <ListItem name="Growth Mode" value={data.csg.growthMode} />
    <ListItem name="Fuel Usage" value={data.csg.fuelUsage} />
    <ListItem name="Dirt Setting" value={data.csg.dirtInterval} />
    <ListItem name="Plowing Required" value={data.csg.plowingRequiredEnabled} />
    <ListItem name="Automatic Motor Start" value={data.csg.automaticMotorStartEnabled} />
    <ListItem name="Crop Destruction" value={data.csg.fruitDestruction} />
</List>
