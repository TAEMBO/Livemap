<script lang="ts">
    export let title: string;
</script>

<div class="card mb-3 shadow-sm">
    <div class="card-header">{title}</div>
    <ul class="list-group list-group-flush">
        <slot />
    </ul>
</div>
