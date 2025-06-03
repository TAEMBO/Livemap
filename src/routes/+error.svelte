<script lang="ts">
	import { page } from "$app/state";
    import Header from "../components/Header.svelte";
    import Main from "../components/Main.svelte";
</script>

<svelte:head>
    <title>{page.status.toString()} | IRT Livemap</title>
</svelte:head>

<Header name="Error" />
<Main>
    <div class="error">
        <img class="d-inline-block align-center flipped" src="/favicon.png" height="256" alt="Main icon" />
        <span class="list-group float-end">{page.error?.message || "Unknown error"}</span>
    </div>
</Main>