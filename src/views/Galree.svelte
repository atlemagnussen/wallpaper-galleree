<script>
    export let param;
    import { userIsLoggedIn, currentFile, currentGallery } from "../store";
    import service from "../services/galreeService.js";
    import { onMount, onDestroy } from "svelte";
    import ButtonDialog from "../components/ButtonDialog.svelte";
    import PopDown from "../components/PopDown.svelte";
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

    let deleteFile = (file) => {
        console.log(file);
    };

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
    span.menu {
        font-size: large;
        display: inline-block;
        margin-left: auto;
    }
    .menu-content {
        background: white;
    }
    .menu-row {
        display: flex;
        flex-direction: row;
        flex-flow: row-reverse;
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
            {#each $currentGallery.items as file, i}
                <div class="thumbnail" >
                    <div class="menu-row">
                        <PopDown>
                            <div slot="btnContent">
                                <span class="menu">...</span>
                            </div>
                            <div slot="dlgContent" class="flex column menu-content">
                                <div>
                                    {file.name}
                                </div>
                                <div on:click={() => deleteFile(file)}>
                                    delete?
                                </div>
                            </div>
                        </PopDown>
                    </div>
                    <Thumbnail name={file.name} url={file.thumbnail} on:click={() => openFileDialog(file)} />
                </div>
            {/each}
    
        {/if}
    </div>
</article>
