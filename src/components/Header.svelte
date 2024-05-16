<script lang="ts">
    export let name: string;
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
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a class="button" type="button" href="javascript:toggleDarkMode()"> Toggle theme </a>
                </li>
            </ul>
        </div>
    </nav>
</header>
