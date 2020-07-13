<script>
    import { onMount } from "svelte";
    import service from "../services/pictureService.js";
    let files = [];
    const list = async () => {
        try {
            files = await service.listAllFiles();
        } catch(ex) {
            console.log(ex);
        }
    };
    onMount(() => {
        // service.listAllFiles();
    });
</script>

<p>all</p>
<button on:click={list}>list</button>

{#each files as file, i}
    <p>{file.name} - {file.contentType} - {file.updated}</p>

{/each}
