<script>
    export let param;
    import storage from "../services/firestorage.js";

    let fileInput;

    const upload = async () => {
        try {
            const file = fileInput.files[0];
            const res = await storage.upload(file.name, file);
            console.log(res);
        } catch(ex) {
            console.log(ex.message);
        }
    };
</script>

<p>Galree id {param}</p>



<input type="file" bind:this={fileInput} />
<button on:click={upload}>Upload</button>
