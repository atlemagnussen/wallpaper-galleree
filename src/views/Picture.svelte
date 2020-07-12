<script>
    import { userIsLoggedIn, currentFile } from "../store";

</script>

<style>
    figure {
        display: inline-block;
        padding: 0;
        margin: 0;
    }
    figure img {
        width: 100%;
        height: 100%;
        /* object-fit: contain; */
        object-fit: scale-down;
    }
</style>
{#if $userIsLoggedIn}
    <figure>
        <img class="dialog" alt={$currentFile.filename} src={$currentFile.url} />
    </figure>
{/if}
