<script>
    export let param;
    import { userIsLoggedIn, currentFile, curRoute } from "../store";
    import service from "../services/galreeService.js";
    import { onMount, onDestroy } from "svelte";
    
    let fileInput;
    let picDialogState = false;

    const openFileDialog = (file) => {
        currentFile.set(file);
    };
    const openFile = () => {
        curRoute.set("/p");
    };

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
        //loadThumbnailUrls(res);
    };

    let unsubLoggedIn;
    onMount(() => {
        unsubLoggedIn = userIsLoggedIn.subscribe(val => {
            if (val)
                loadFiles();
            else
                filesUrls = [];
        });
    });
    onDestroy(() => {
        if (unsubLoggedIn)
            unsubLoggedIn();
    });

</script>

<style>
    figure {
        display: inline-block;
    }
    figure img {
        width: 10rem;
        height: 10rem;
    }
</style>
<p>Galree id {param}</p>
{#if $userIsLoggedIn}
    <input type="file" bind:this={fileInput} />
    <button on:click={upload}>Upload</button>

    <p>
        <button on:click={loadFiles}>Load</button>
    </p>

    {#each filesUrls as file, i}
        <figure>
            <img on:click={() => openFileDialog(file)} alt={file.filename} src="{file.thumbnail}" />
            <figcaption on:click={() => openFile(file)}>
                {file.filename}
            </figcaption>
        </figure>
    {/each}
    
{/if}
