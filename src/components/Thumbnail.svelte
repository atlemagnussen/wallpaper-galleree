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
        cursor: pointer;
        /*background: var(--grey-400);*/
        /* display: grid;
        grid-template-rows: auto 1fr;
        place-items: center; */
    }
    /*figcaption {
        width: 100%;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }*/
    figure img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        border: 0.1rem solid var(--grey-300);
        /* object-fit: scale-down; */
    }
</style>
{#if $userIsLoggedIn}
    <figure on:click title={name}>
        <img class="dialog" alt={name} src={url} />
    </figure>
{/if}
