<script>
    import {onMount} from "svelte";
    import { MDCRipple } from "@material/ripple";

    export let icon = false;
    export let tooltip;
    export let color = "--mdc-theme-primary"
    let element;
    onMount(() => {
        const buttonRipple = new MDCRipple(element);
    });
</script>
<style>
    button {
        margin: 0;
    }
    @media only screen and (max-width: 640px) {
        span {
            display: none;
        }
        i.material-icons {
            margin: 0;
        }
    }
</style>
<button class="mdc-button mdc-button--outlined" 
    bind:this={element} on:click title="{tooltip}"
    style="color: var({color})">
    <div class="mdc-button__ripple"></div>
    {#if icon}
        <i class="material-icons mdc-button__icon" aria-hidden="true">{icon}</i>
    {/if}
    <span class="mdc-button__label">
        <slot></slot>
    </span>
</button>
<!-- <div class="mdc-touch-target-wrapper">
    <button class="mdc-button mdc-button--touch" bind:this={element}>
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">{text}</span>
        <div class="mdc-button__touch"></div>
    </button>
</div> -->
