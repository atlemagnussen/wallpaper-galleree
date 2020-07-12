<script>
    import { userIsLoggedIn, currentFile } from "../store";

</script>

<style>
    figure {
        padding: 0;
        margin: 0;
        height: 100%;
        box-sizing: border-box;
        display: grid;
        grid-template-rows: auto 1fr;
        place-items: center;
    }
    figure img {
        height: 100%;
        object-fit: contain;
        /* object-fit: scale-down; */
    }
</style>
{#if $userIsLoggedIn}
    <figure>
        <figcaption>{$currentFile.filename}</figcaption>
        <img class="dialog" alt={$currentFile.filename} src={$currentFile.url} />
    </figure>
{/if}
