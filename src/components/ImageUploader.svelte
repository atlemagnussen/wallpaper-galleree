<script>
    import { onMount, onDestroy } from "svelte";
    import service from "../services/galreeService.js";
    export let onClose;
    export let galreeId;
    let uploadProgress = 0;
    let fileInput;

    let isDraggingOver = false;
    let dropZoneEl;
    const close = () => {
        if (onClose) {
            onClose();
        }
    };
    const onDrop = (ev) => {
        ev.preventDefault();
        console.log(ev);
        console.log("onDrop");

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (ev.dataTransfer.items[i].kind === 'file') {
                    let file = ev.dataTransfer.items[i].getAsFile();
                    console.log('... file[' + i + '].name = ' + file.name);
                    uploadFile(file)
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (let i = 0; i < ev.dataTransfer.files.length; i++) {
                console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
                uploadFile(file);
            }
        }
        isDraggingOver = false;
    };
    const onDragOver = (e) => {
        e.preventDefault();
        isDraggingOver = true;
    }
    onMount(() => {
        dropZoneEl.addEventListener("drop", onDrop);
        dropZoneEl.addEventListener("dragover", onDragOver);
    });
    onDestroy(() => {
        dropZoneEl.removeEventListener("drop", onDrop);
        dropZoneEl.removeEventListener("dragover", onDragOver);
    });

    const uploadFromInput = () => {
        const file = fileInput.files[0];
        uploadFile(file);
    }
    const uploadFile = async (file) => {
        console.log(`${file.name} to be uploaded`);
        const uploadTask = service.uploadFile(galreeId, file.name, file);
        uploadTask.on("state_changed", (snapshot) => {
            uploadProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log("Upload is paused");
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log("Upload is running");
                    break;
            }
        }, (error) => {
            console.log(error);
        }, async () => {
            const url = await uploadTask.snapshot.ref.getDownloadURL();
        });
    };
</script>

<style>
    #drop-zone {
        width: 360px;
        height: 240px;

        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 1rem;
        padding: 1rem 0 0;

        outline: 2px dashed #92b0b3;
        color: #92b0b3;
        /* outline-offset: -10px; */

        font-size: 1.25rem;
        background-color: #c8dadf;
    }
    #drop-zone.drag-over {
        outline: 2px dashed var(--mdc-theme-primary);
        background-color: var(--mdc-theme-secondary);
    }
</style>

<div class="uploader">
    <input type="file" bind:this={fileInput} on:change={uploadFromInput} />
    <span class="upload">Upload {uploadProgress}%</span>
</div>
<div id="drop-zone" bind:this={dropZoneEl} class:drag-over={isDraggingOver}>
    <div>Drop files here</div>
</div>
<p>
    <button on:click={close}>close</button>
</p>
