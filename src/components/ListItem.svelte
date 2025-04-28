<script lang="ts">
    import ListItemBase from "./ListItemBase.svelte";

    export let name: string;
    export let value: string;
</script>

<ListItemBase>
    <b>{name}</b>
    <slot/>
    <span class="float-end">{value}</span>
</ListItemBase>
