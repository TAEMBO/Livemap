<script lang="ts">
    import pkg from "../../package.json";

    const year = new Date().getFullYear();
</script>

<footer class="footer mt-auto py-3">
    <div class="container">
        <span class="text-muted">
            <a href={pkg.homepage} target="_blank">{pkg.author}</a> © {year}
        </span>
        <span class="text-muted float-end">Farming Simulator Livemap - <a href={pkg.repository.url} target="_blank">Source</a></span>
    </div>
</footer>
