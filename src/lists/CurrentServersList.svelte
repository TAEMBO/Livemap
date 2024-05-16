<script lang="ts">
    import { serverHrefs } from "$lib";
    import List from "../components/List.svelte";
    import ListItem from "../components/ListItem.svelte";
</script>

<List title="Current Servers" column="col-xl-2">
    {#each serverHrefs as server}
        <ListItem><a href={server.href}>{server.name}</a></ListItem>
    {/each}
</List>
