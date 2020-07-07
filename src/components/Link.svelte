<script>
    import { curRoute } from "../store";
    export let page;
    export let color;
    export let icon;
    const redirectTo = (event) => {
        curRoute.set(event.currentTarget.pathname);
    };
</script>

<style>
    a {
        padding: 1rem;
        color: var(--secondary-text);
    }
</style>

{#if icon}
    <a href={page.path} on:click|preventDefault={redirectTo} style="color: {color}" title={page.name}>
        <i class="material-icons mdc-button__icon" aria-hidden="true">{icon}</i>
    </a>
{:else}
    <a href={page.path} on:click|preventDefault={redirectTo} style="color: {color}" title={page.name}>
        <slot>{page.name}</slot>
    </a>
{/if}