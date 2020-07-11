<script>
    export let param;
    import { userIsLoggedIn } from "../store";
    import service from "../services/galreeService.js";
    import { onMount, onDestroy } from "svelte";
    import Dialog from "../components/Dialog.svelte";
    
    let fileInput;
    let picDialogState = false;
    let currentFile;

    const openFileDialog = (file) => {
        picDialogState = true;
        currentFile = file;
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
    img.dialog {
        height: 96vh;
        width: 96vw;
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
        <figure on:click={() => openFileDialog(file)}>
            <img alt={file.filename} src="{file.thumbnail}" />
        </figure>
    {/each}
    
    <Dialog openState="{picDialogState}" background="--warning-color">
        <div slot="btnContent">
        </div>
        <div slot="dlgContent" class="flex column" on:click={() => picDialogState = false}>
            {#if picDialogState}
                <img class="dialog" alt={currentFile.filename} src={currentFile.url} />
            {/if}
            <p>
                <button on:click={() => picDialogState = false} icon="cancel" color="white">close</button>
            </p>
        </div>
    </Dialog>
{/if}
