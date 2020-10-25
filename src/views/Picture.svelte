<script>
    import { onMount } from "svelte";
    import { userIsLoggedIn, currentFile } from "../store";
    import Touch from "../services/touch.js";
    import Spinner from "../components/Spinner.svelte";
    import FloatingCircle from "../components/FloatingCircle.svelte";
    import ArrowRight from "../components/ArrowRight.svelte";
    import ArrowLeft from "../components/ArrowLeft.svelte";
    let loading = false;
    let wrapperEl;
    export let rightClick = () => {
        return;
    };
    export let leftClick = () => {
        return;
    };
    const next = (e) => { 
        e.preventDefault();
        e.stopPropagation();
        console.log("next");
        rightClick();
    };
    const prev = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("prev");
        leftClick();
    };
    onMount(() => {
        currentFile.subscribe(val => {
            if (val) {
                console.log("loading");
                loading = true;
            }
        });

        new Touch(wrapperEl, leftClick, rightClick);
    });

    const loaded = () => {
        loading = false;
    };
</script>

<style>
    div.wrapper {
        display:block;
        height: 100%;
    }
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
<div class="wrapper" bind:this={wrapperEl}>
{#if $userIsLoggedIn}
    <div class="{ loading ? 'show' : '' }">
        <Spinner />
    </div>
    <FloatingCircle float="left" on:click={prev}>
        <ArrowLeft />
    </FloatingCircle>
    <FloatingCircle on:click={next}>
        <ArrowRight/>
    </FloatingCircle>
    <figure class="{ loading ? '' : 'show' }">
        <figcaption>{$currentFile.name}</figcaption>
        <img class="dialog" alt={$currentFile.name} src={$currentFile.url} on:load={loaded} />
    </figure>
{/if}
</div>
