<script lang="ts">
    import type { Marker } from "leaflet";
    import List from "../components/List.svelte";
    import ListItem from "../components/ListItem.svelte";
    import ListItemBase from "../components/ListItemBase.svelte";
    import type { ListsPlayerSlots } from "../typings";

    export let data: ListsPlayerSlots;
    export let popupPairs: Map<string, Marker>;

    function popup(name: string) {
        const marker = popupPairs.get(name);

        if (!marker) throw new Error(`Missing marker for ${name}`);

        marker.openPopup();
    }
</script>

<List title="Player Slots - {data.slots.used}/{data.slots.capacity}">
    {#if !data.players.length}
        <ListItemBase><b>No players online</b></ListItemBase>
    {:else}
        {#each data.players as player}
            <ListItem name={player.name} value={player.uptime}>
                {#if popupPairs.has(player.name)}
                    <button type="button" title="Highlight occupied vehicle" on:click={() => popup(player.name)}>&#128668;</button>
                {/if}
                {#if player.isAdmin}
                    <span class="top-0 ms-1 badge square-pill bg-info">Admin</span>
                {/if}
            </ListItem>
        {/each}
    {/if}
</List>
