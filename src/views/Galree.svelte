<script>
    export let param;
    import { userIsLoggedIn, currentFile } from "../store";
    import service from "../services/galreeService.js";
    import { onMount, onDestroy } from "svelte";
    import Thumbnail from "../components/Thumbnail.svelte";
    let fileInput;

    const openFileDialog = (file) => {
        currentFile.set(file);
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
    article {
        display: grid;
        grid-template-rows: auto 1fr;
        grid-gap: 1rem;
    }
    div.header {
        display: flex;
        flex-direction: column;
    }
    div.thumbnails {
        display: inline-block;
        width: 200px;
        height: 200px;
        max-width: 200px;
        max-height: 200px;
        margin-right: 1rem;
    }
    .btn-upload {
        
    }
</style>
<article>
    <div class="header">
        <p>Galree id {param}</p>
        {#if $userIsLoggedIn}
            <div class="uploader">
                <input type="file" bind:this={fileInput} />
                <button class="btn-upload" on:click={upload}>Upload</button>
            </div>
        {/if}
    </div>
    <div class="list">
        {#if $userIsLoggedIn}
            {#each filesUrls as file, i}
                <div class="thumbnails" on:click={() => openFileDialog(file)} >
                    <Thumbnail name={file.name} url={file.thumbnail} />
                </div>
            {/each}
    
        {/if}
    </div>
</article>

