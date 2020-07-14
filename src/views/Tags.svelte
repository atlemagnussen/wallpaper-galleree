<script>
    import { onMount, onDestroy } from "svelte";
    import { userIsLoggedIn } from "../store";
    import service from "../services/tagService.js";
    import Tag from "../components/Tag.svelte";
    let newTagName, newTagColor;
    let tags = [];
    let unsub;
    onMount(() => {
        unsub = userIsLoggedIn.subscribe(async val => {
            if (val)
                tags = await service.all();
        })
    });
    onDestroy(() => {
        if (unsub) unsub();
    });

    let create = async () => {
        try {
            const newTag = await service.create(newTagName, newTagColor);
            tags.push(newTag);
        } catch(ex) {
            console.log(ex);
        }
    }
</script>
<style>
    form {
        margin-bottom: 1rem;
    }
</style>
<h1>Tags</h1>
{#if $userIsLoggedIn}
    <form>
        <p>
            <label>name</label>
            <input type="text" bind:value={newTagName} />
        </p>
        <p>
            <label>color</label>
            <input type="text" bind:value={newTagColor} />
        </p>
        <button on:click={create}>Add new tag</button>
    </form>
    {#each tags as tag, i}
        <Tag tag={tag} />
    {/each}
{/if}