<script>
    export let param;
    import { userIsLoggedIn, currentFile } from "../store";
    import service from "../services/galreeService.js";
    import { onMount, onDestroy } from "svelte";
    import ButtonDialog from "../components/ButtonDialog.svelte";
    import Thumbnail from "../components/Thumbnail.svelte";
    let fileInput;

    let uploadDialogState = false;
    let uploadProgress = 0;
    const openFileDialog = (file) => {
        currentFile.set(file);
    };

    const upload = async () => {
        const file = fileInput.files[0];
        const uploadTask = service.uploadFile(param, file.name, file);
        uploadTask.on("state_changed", (snapshot) => {
            uploadProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log("Upload is paused");
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log("Upload is running");
                    break;
            }
        }, (error) => {
            console.log(error);
        }, async () => {
            const url = await uploadTask.snapshot.ref.getDownloadURL();
        });
    };

    let filesData = [];
    
    const loadFiles = async () => {
        filesData = await service.getFilesData(param);
        //loadThumbnailUrls(res);
    };

    let unsubLoggedIn;
    onMount(() => {
        
        unsubLoggedIn = userIsLoggedIn.subscribe(val => {
            if (val)
                loadFiles();
            else
                filesData = [];
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

</style>
<article>
    <div class="header">
        <p>Galree id {param}</p>
        {#if $userIsLoggedIn}
            <ButtonDialog openState="{uploadDialogState}">
                <div slot="btnContent">
                    <button on:click={() => uploadDialogState = true}>
                        <i class="material-icons mdc-button__icon" aria-hidden="true">library_add</i>
                    </button>
                </div>
                <div class="picframe" slot="dlgContent" >
                    <div class="uploader">
                        <input type="file" bind:this={fileInput} on:change={upload} />
                        <span class="upload">Upload {uploadProgress}%</span>
                    </div>
                    <p>
                        <button on:click={() => uploadDialogState = false}>close</button>
                    </p>
                </div>
            </ButtonDialog>
        {/if}
    </div>
    <div class="list">
        {#if $userIsLoggedIn}
            {#each filesData as file, i}
                <div class="thumbnail" on:click={() => openFileDialog(file)} >
                    <Thumbnail name={file.name} url={file.thumbnail} />
                </div>
            {/each}
    
        {/if}
    </div>
</article>
