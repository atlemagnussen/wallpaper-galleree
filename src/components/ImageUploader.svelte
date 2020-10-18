<script>
    import service from "../services/galreeService.js";
    export let onClose;
    export let galreeId;
    let uploadProgress = 0;
    let fileInput;

    const close = () => {
        if (onClose) {
            onClose();
        }
    };

    const upload = async () => {
        const file = fileInput.files[0];
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


<div class="uploader">
    <input type="file" bind:this={fileInput} on:change={upload} />
    <span class="upload">Upload {uploadProgress}%</span>
</div>
<p>
    <button on:click={close}>close</button>
</p>
