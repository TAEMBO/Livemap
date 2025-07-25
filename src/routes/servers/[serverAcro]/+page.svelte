<script lang="ts">
    import Header from "../../../components/Header.svelte";
    import LeafletMap from "../../../components/LeafletMap.svelte";
    import ListColumn from "../../../components/ListColumn.svelte";
    import Main from "../../../components/Main.svelte";
    import NewServerBanner from "../../../components/NewServerBanner.svelte";
    import PlayerSlotsList from "../../../lists/PlayerSlotsList.svelte";
    import HelperSettingsList from "../../../lists/HelperSettingsList.svelte";
    import ServerDetailsList from "../../../lists/ServerDetailsList.svelte";
    import CurrentServersList from "../../../lists/CurrentServersList.svelte";
    import type { RouteDataServersDynamicServerAcro } from "../../../typings";
    import type { Marker } from "leaflet";

    export let data: RouteDataServersDynamicServerAcro;
    
    let popupPairs = new Map<string, Marker>();
</script>

<svelte:head>
    <title>{data.dss.server.name.replace(/&#(\d+);/, "") || "Server Offline"} | IRT Livemap</title>
</svelte:head>

<Header name={data.dss.server.name.replace(/&#(\d+);/, "") || "Server Offline"} loginText={data.loginText} />
<Main>
    {#if data.csg.isNewServer}
        <NewServerBanner />
    {/if}
    <ListColumn>
        <CurrentServersList serverHrefs={data.serverHrefs} />
        <PlayerSlotsList data={data.dss} bind:popupPairs={popupPairs} />
    </ListColumn>
    {#key data.serverAcro}
        <LeafletMap serverAcro={data.serverAcro} vehicles={data.vehicles} bind:popupPairs={popupPairs} />
    {/key}
    <ListColumn>
        <ServerDetailsList {data} />
        <HelperSettingsList data={data.csg} />
    </ListColumn>
</Main>
