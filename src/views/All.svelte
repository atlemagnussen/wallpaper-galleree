<script>
    import { onMount } from "svelte";
    import service from "../services/pictureService.js";
    import fileService from "../services/filesService.js";

    let files = [];
    const list = async () => {
        try {
            files = await service.listAllFiles();
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const test = await fileService.findByPath(file.path);
                if (!test) {
                    const creat = await fileService.create(file);
                    console.log(creat);
                }
            }
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
