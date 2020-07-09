<script>
    import { onDestroy } from "svelte";
    import { curRoute } from "./store";
    import * as routes from "./routes";

    let component, param, action;

    const unsubscribe = curRoute.subscribe(async value => {
        const route = await routes.findRoute(value);
        component = route.component;
        param = route.param;
        action = route.action;
    });

    onDestroy(unsubscribe);

</script>

<style>

</style>

<section class="main-container">
    {#if param}
        {#if action}
            <svelte:component this={component} param={param} action={action} />
        {:else}
            <svelte:component this={component} param={param} />
        {/if}
    {:else}
        <svelte:component this={component} />
    {/if}
</section>
