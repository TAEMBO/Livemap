<script lang="ts">
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import LeafletMap from "../../../components/LeafletMap.svelte";
    import Main from "../../../components/Main.svelte";
    import NewServerBanner from "../../../components/NewServerBanner.svelte";
    import PlayerSlotsList from "../../../lists/PlayerSlotsList.svelte";
    import HelperSettingsList from "../../../lists/HelperSettingsList.svelte";
    import ServerDetailsList from "../../../lists/ServerDetailsList.svelte";
    import CurrentServersList from "../../../lists/CurrentServersList.svelte";
    import type { RouteDataServersDynamicServerAcro } from "../../../typings";

    export let data: RouteDataServersDynamicServerAcro;
</script>

<svelte:head>
    <title>{data.dss.server.name} | IRT Livemap</title>
</svelte:head>

<Header name={data.dss.server.name} />
<Main>
    {#if data.csg.isNewServer}
        <NewServerBanner />
    {/if}
    <CurrentServersList />
    <PlayerSlotsList data={data.dss} />
    <LeafletMap />
    <ServerDetailsList {data} />
    <HelperSettingsList data={data.csg} />
</Main>
<Footer />
