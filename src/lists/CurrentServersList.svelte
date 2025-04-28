<script lang="ts">
    import { serverHrefs } from "$lib";
    import List from "../components/List.svelte";
    import ListItemBase from "../components/ListItemBase.svelte";
</script>

<List title="Current Servers">
    {#each serverHrefs as server}
        <ListItemBase><a class="list-group-anchor" data-sveltekit-preload-data="off" href={server.href}>{server.name}</a></ListItemBase>
    {/each}
</List>
