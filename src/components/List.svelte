<script lang="ts">
    export let title: string;
    export let column: `col-${string}` = "col-sm";
</script>

<div class={column}>
    <div class="card mb-3 shadow-sm">
        <div class="card-header">{title}</div>
        <ul class="list-group list-group-flush">
            <slot />
        </ul>
    </div>
</div>
