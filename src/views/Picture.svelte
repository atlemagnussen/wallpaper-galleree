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
        color: var(--mdc-theme-primary);
        background: var(--mdc-theme-background);
    }
    figure img {
        height: 100%;
        object-fit: contain;
        /* object-fit: scale-down; */
    }
</style>
{#if $userIsLoggedIn}
    <figure>
        <figcaption>{$currentFile.name}</figcaption>
        <img class="dialog" alt={$currentFile.name} src={$currentFile.url} />
    </figure>
{/if}
