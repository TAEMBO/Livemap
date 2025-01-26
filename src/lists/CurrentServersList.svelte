<script lang="ts">
    import { serverHrefs } from "$lib";
    import List from "../components/List.svelte";
    import ListItem from "../components/ListItem.svelte";
</script>

<List title="Current Servers">
    {#each serverHrefs as server}
        <ListItem><a class="list-group-anchor" data-sveltekit-preload-data="off" href={server.href}>{server.name}</a></ListItem>
    {/each}
</List>
