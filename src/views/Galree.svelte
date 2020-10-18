<script>
    export let param;
    import { userIsLoggedIn, currentFile, currentGallery } from "../store";
    import service from "../services/galreeService.js";
    // import { onMount, onDestroy } from "svelte";
    import DialogDelete from "../components/DialogPrompt.svelte";
    import ButtonDialog from "../components/ButtonDialog.svelte";
    import PopDown from "../components/PopDown.svelte";
    import Thumbnail from "../components/Thumbnail.svelte";
    import ImageUploader from "../components/ImageUploader.svelte";

    let deleteDialogState = false;
    let uploadDialogState = false;

    const openFileDialog = (file) => {
        currentFile.set(file);
    };

    let fileToBeDeleted = { name: "" }
    let showDeleteFileDialog = (file) => {
        deleteDialogState = true;
        fileToBeDeleted = file;
    };
    let deleteFile = async () => {
        const res = await service.removeAndDeleteFile(param, fileToBeDeleted.name)
        deleteDialogState = false;
    }

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
    .delete-dialog-content {
        display: flex;
        flex-direction: column;
        height: 100%;
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
                    <ImageUploader onClose={() => uploadDialogState = false} galreeId={param} />
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
                                <div on:click={() => showDeleteFileDialog(file)}>
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
<DialogDelete openState="{deleteDialogState}">
    <div slot="btnContent">
        
    </div>
    <div slot="dlgContent" class="flex column delete-dialog">
        <div>
            Really delete plan {fileToBeDeleted.name}?
        </div>
        <p>Really?</p>
        <p>
            <button on:click="{() => deleteDialogState = false}" icon="cancel" color="white">Cancel</button>
            <button on:click="{deleteFile}" icon="delete">Delete</button>
        </p>
    </div>
</DialogDelete>