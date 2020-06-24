<script>
    import { curRoute } from "../store";
    export let page;
    export let color;
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

<a href={page.path} on:click|preventDefault={redirectTo} style="color: {color}">
    <slot>{page.name}</slot>
</a>
