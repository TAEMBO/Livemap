<script lang="ts">
    import List from "../components/List.svelte";
    import ListItemBase from "../components/ListItemBase.svelte";
    import type { RouteDataServersDynamicServerAcro } from "../typings";

    export let serverHrefs: RouteDataServersDynamicServerAcro["serverHrefs"];
</script>

<List title="Current Servers">
    {#each serverHrefs as server}
        <ListItemBase><a class="list-group-anchor" data-sveltekit-preload-data="off" href={server.href}>{server.name}</a></ListItemBase>
    {/each}
</List>
