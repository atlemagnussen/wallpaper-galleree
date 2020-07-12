<script>
    let dialogEl;
    export let openState = false;
    $: if (openState) {
        if (dialogEl && !dialogEl.open)
            dialogEl.showModal();
    } else {
        if (dialogEl && dialogEl.open)
            dialogEl.close();
    }

</script>

<style>
    dialog {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        z-index: 900;
        padding: 0;
        margin: 0;
        border: 1px solid var(--mdc-theme-background);
        box-sizing: border-box;
    }
    .dlgContent {
        background: red;
        height: 100%;
    }
</style>

<dialog class="general-dialog" bind:this={dialogEl}>
    <slot class="dlgContent" name="dlgContent">dialog content</slot>
</dialog>
