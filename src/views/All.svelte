<script>
    import { onMount } from "svelte";
    import service from "../services/pictureService.js";
    import fileService from "../services/filesService.js";

    let files = [];
    const list = async () => {
        try {
            files = await service.listAllFiles();
            var first = files[0];
            var test = await fileService.create(first);
            console.log(test);
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
