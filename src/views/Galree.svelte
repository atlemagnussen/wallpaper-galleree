<script>
    export let param;
    import service from "../services/galreeService.js";
    import picService from "../services/pictureService.js";
    import { onMount } from "svelte";
    let fileInput;
    let files = ["atle-2020.jpg", "atle-2020-g.jpg"];
    const upload = async () => {
        try {
            const file = fileInput.files[0];
            const res = await service.uploadFile(param, file.name, file);
            loadFiles();
            console.log(res);
        } catch(ex) {
            console.log(ex.message);
        }
    };

    let filesUrls = [];
    
    const loadFiles = async () => {
        const res = await service.getFilesUrls(param);
        filesUrls = res;
       // loadThumbnailUrls(res);
    };

    const loadThumbnailUrls = (files) => {
        const filesWithThumbbailUrl = files.map((f) => {
            const res = picService.getThumbnailUrl(f.filename);
            f.thumbnail = res;
            return f;
        });
        filesUrl = filesWithThumbbailUrl;
    }
    

    onMount(() => {
        loadFiles();
    });
</script>

<style>
    img {
        width: 10rem;
        height: 10rem;
    }
</style>
<p>Galree id {param}</p>



<input type="file" bind:this={fileInput} />
<button on:click={upload}>Upload</button>

<p>
    <button on:click={loadFiles}>Load</button>
</p>

{#each filesUrls as { thumbnail, filename, url }, i}
    <img alt={filename} src="{thumbnail}" />
{/each}