<script>
    let dialogEl;
    export let openState = false;
    export let background = "--mdc-theme-primary";
    let toggleDialog = () => {
        openState = !openState;
    };
    $: if (openState) {
        if (dialogEl && !dialogEl.open)
            dialogEl.showModal();
    } else {
        if (dialogEl && dialogEl.open)
            dialogEl.close();
    }

</script>

<style>
    div {
        display: inline-block;
    }
    dialog {
        left: 2rem;
        color: white;
        text-align: center;
        border: none;
        padding: 1rem;
        border-radius: 6px;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.25);
        max-width: 90vw;
    }

    dialog::backdrop {
        background: linear-gradient(45deg, rgba(26, 32, 31, 0.5), rgba(29, 28, 24, 0.5));
    }
</style>

<div>
    <slot name="btnContent">Open dlg</slot>
</div>
<dialog class="general-dialog" bind:this={dialogEl} style="background: var({background})">
    <slot name="dlgContent">dialog content</slot>
</dialog>
