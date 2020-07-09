<script>
    import * as service from "../services/galreeService.js";
    let newGalName;

    const addNew = async () => {
        await service.create(newGalName);
    };
</script>

<p>New galree</p>
<input bind:value={newGalName} label="New plan" />
<button on:click={addNew}>Create</button>