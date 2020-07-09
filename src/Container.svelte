<script>
    import { onDestroy } from "svelte";
    import { curRoute } from "./store";
    import * as routes from "./routes";

    let routeName, component, param, action;

    const unsubscribe = curRoute.subscribe(async value => {
        const route = routes.findRoute(value);
        component = await routes.findComponent(route.name);
        param = route.param;
        action = route.action
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
