<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import Header from "../components/Header.svelte";
    import ListColumn from "../components/ListColumn.svelte";
    import Main from "../components/Main.svelte";
    import CurrentServersList from "../lists/CurrentServersList.svelte";
    import type { RouteDataServersDynamicServerAcro } from "../typings";

    export let data: Pick<RouteDataServersDynamicServerAcro, "serverHrefs" | "loginText">;

    onMount(async () => {
        if (page.url.searchParams.has("auth")) await goto("/", { invalidateAll: true });
    });
</script>

<svelte:head>
    <title>Home | IRT Livemap</title>
</svelte:head>

<Header name="Home" loginText={data.loginText} />
<Main>
    <ListColumn>
        <CurrentServersList serverHrefs={data.serverHrefs} />
    </ListColumn>
</Main>
