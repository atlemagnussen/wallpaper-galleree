<script>
    import { onMount } from "svelte";
    import Link from "../components/Link.svelte";
    import { userProfile, galleriesStore } from "../store";
    import * as service from "../services/galreeService.js";
    let galrees = [];
    userProfile.subscribe(async (val) => {
        if (val)
            galrees = await service.all();
    });
    // onMount(async () => {
        
    // });
    
</script>

{#if $userProfile.loggedIn}
    <h3>Your galleries</h3>

    <ul>
        {#each $galleriesStore as { name, _id }, i}
            <p>
                <Link page="{{ path: '/plans/' + _id, name }}"></Link>
            </p>
        {/each}
    </ul>
{:else}
    <h3>Not logged in</h3>
{/if}
