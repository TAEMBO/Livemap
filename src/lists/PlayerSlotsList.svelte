<script lang="ts">
    import List from "../components/List.svelte";
    import ListItem from "../components/ListItem.svelte";
    import type { ListsPlayerSlots } from "../typings";

    export let data: ListsPlayerSlots;
</script>

<List title="Player Slots - {data.slots.used}/{data.slots.capacity}">
    {#if !data.players.length}
        <ListItem>No players online</ListItem>
    {:else}
        {#each data.players as player}
            <ListItem>
                {player.name}
                {#if player.isAdmin}
                    <span class="top-0 ms-1 badge square-pill bg-info">Admin</span>
                {/if}
                <span class="float-end">{player.uptime}</span>
            </ListItem>
        {/each}
    {/if}
</List>
