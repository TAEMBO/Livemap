<script lang="ts">
    import { onMount } from "svelte";
    import { setTheme } from "$lib";

    export let name: string;
    export let loginText: string;

    function toggleTheme() {
        setTheme(localStorage.getItem("theme") === "dark" ? "light" : "dark");
    }

    onMount(() => setTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light"));
</script>

<header>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
        <div class="container">
            <div class="navbar-brand">
                <img class="d-inline-block align-center" src="/favicon.png" height="40" alt="Main icon" />
                <span class="d-inline-block ms-2">{name}</span>
            </div>
            <ul class="navbar nav">
                <li class="nav-item">
                    <a class="button" href="/"> Home </a>
                </li>
                <li>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <a class="button" type="button" role="button" tabindex={0} on:click={toggleTheme}>
                        Toggle theme
                    </a>
                </li>
                <li class="nav-item">
                    <a class="button" href="/login"> {loginText} </a>
                </li>
            </ul>
        </div>
    </nav>
</header>
