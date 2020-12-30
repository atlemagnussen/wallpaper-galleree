<script>
    import { onMount, onDestroy } from "svelte";
    import service from "../services/galreeService.js";
    export let onClose;
    export let galreeId;
    let uploadProgress = 0;
    let fileInput;
    let uploadedItems = [];

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
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                if (ev.dataTransfer.items[i].kind === "file") {
                    let file = ev.dataTransfer.items[i].getAsFile();
                    uploadFile(file);
                }
            }
        } else {
            for (let i = 0; i < ev.dataTransfer.files.length; i++) {
                let file = ev.dataTransfer.files[i];
                uploadFile(file);
            }
        }
        isDraggingOver = false;
    };
    const onDragEnter = (e) => {
        e.preventDefault();
        isDraggingOver = true;
    };
    const onDragOver = (e) => {
        e.preventDefault();
        isDraggingOver = true;
    };
    const onDragLeave = (e) => {
        e.preventDefault();
        isDraggingOver = false;
    };
    onMount(() => {
        dropZoneEl.addEventListener("drop", onDrop);
        dropZoneEl.addEventListener("dragenter", onDragEnter);
        dropZoneEl.addEventListener("dragover", onDragOver);
        dropZoneEl.addEventListener("dragleave", onDragLeave);
    });
    onDestroy(() => {
        dropZoneEl.removeEventListener("drop", onDrop);
        dropZoneEl.removeEventListener("dragenter", onDragEnter);
        dropZoneEl.removeEventListener("dragover", onDragOver);
        dropZoneEl.removeEventListener("dragleave", onDragLeave);
    });

    const uploadFromInput = () => {
        const file = fileInput.files[0];
        uploadFile(file);
    };
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
            const sizeMb = (file.size / 1024) / 1024;
            const size = sizeMb.toFixed(2);
            uploadedItems = [...uploadedItems, { name: file.name, size, url }];
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
    #upload-log {
        color: var(--mdc-theme-secondary);
    }
    .uploaded-item {
        display: block;
        margin: 0;
        padding: 0;
    }
</style>

<div class="uploader">
    <input type="file" bind:this={fileInput} on:change={uploadFromInput} />
    <span class="upload">Upload {uploadProgress}%</span>
</div>
<div id="drop-zone" bind:this={dropZoneEl} class:drag-over={isDraggingOver}>
    <div>Drop files here</div>
</div>
<div id="upload-log">
    {#each uploadedItems as file, i}
        <p class="uploaded-item">
            {file.name} ({file.size}mb)
        </p>
    {/each}
</div>
<p>
    <button on:click={close}>close</button>
</p>
