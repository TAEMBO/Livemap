<script lang="ts">
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
    import Main from "../components/Main.svelte";
    import CurrentServersList from "../lists/CurrentServersList.svelte";
</script>

<svelte:head>
    <title>Home | IRT Livemap</title>
</svelte:head>

<Header name="Home" />
<Main>
     <CurrentServersList />
</Main>
<Footer />
