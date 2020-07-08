<script>
    import { isDarkTheme } from "../store";

    const toggle = () => {
        isDarkTheme.toggle();
    };
</script>
<style>
    div {
        user-select: none;
        display: inline-block;
        cursor: pointer;
    }
    i {
        color: var(--mdc-theme-surface);
    }
</style>
<div on:click={toggle}>
    {#if $isDarkTheme}
        <i class="material-icons mdc-button__icon" aria-hidden="true">night_stay</i>
    {:else}
        <i class="material-icons mdc-button__icon" aria-hidden="true">brightness_low</i>
    {/if}

</div>