<script>
    export let param;
    import service from "../services/galreeService.js";

    let fileInput;
    let files = ["atle-2020.jpg", "atle-2020-g.jpg"];
    const upload = async () => {
        try {
            const file = fileInput.files[0];
            const res = await service.uploadFile(file.name, file);
            console.log(res);
        } catch(ex) {
            console.log(ex.message);
        }
    };

    let filesUrl = [];
    const loadFilesUrls = async () => {
        return Promise.all(files.map(f => service.getFileUrl(f)));
    };
    const loadFiles = async () => {
        const res = await loadFilesUrls();
        filesUrl = res;
    }
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

{#each filesUrl as url, i}
    <img alt={files[i]} src="{url}" />
{/each}