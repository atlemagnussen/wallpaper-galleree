<script>
    import { onMount } from "svelte";
    import { userIsLoggedIn, currentFile } from "../store";
    import Spinner from "../components/Spinner.svelte";
    let loading = false;
    onMount(() => {
        currentFile.subscribe(val => {
            console.log(val);
            if (val) {
                console.log("loading");
                loading = true;
            }
        });
    });

    const loaded = () => {
        console.log("not loading");
        loading = false;
    };
</script>

<style>
    div {
        display: none;
    }
    div.show {
        display: block;
    }
    figure {
        display: none;
    }
    figure.show {
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
        width: 100%;
        object-fit: contain;
        /*object-fit: scale-down;*/
    }
</style>
{#if $userIsLoggedIn}
    <div class="{ loading ? 'show' : '' }">
        <Spinner />
    </div>
    <figure class="{ loading ? '' : 'show' }">
        <figcaption>{$currentFile.name}</figcaption>
        <img class="dialog" alt={$currentFile.name} src={$currentFile.url} on:load={loaded} />
    </figure>
{/if}
