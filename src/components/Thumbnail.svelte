<script>
    export let name;
    export let url;
    import { userIsLoggedIn } from "../store";

</script>

<style>
    figure {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        /* display: grid;
        grid-template-rows: auto 1fr;
        place-items: center; */
    }
    figcaption {
        width: 100%;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    figure img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        /* object-fit: scale-down; */
    }
</style>
{#if $userIsLoggedIn}
    <figure>
        <img class="dialog" alt={name} src={url} />
    </figure>
{/if}
