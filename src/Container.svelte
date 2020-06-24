<script>
    import { onDestroy } from "svelte";
    import { curRoute } from "./store";
    import * as routes from "./routes";
    import pathBreaker from "./services/pathBreaker.js";

    let routeName, component, param, action;

    const unsubscribe = curRoute.subscribe(value => {
        var route = pathBreaker.getRoute(value);
        component = routes.findComponent(route.name);
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
