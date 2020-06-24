<script>
    import { onMount } from "svelte";
    import {MDCTextField} from '@material/textfield';
    export let label = "";
    export let value = "";
    export let type = "outlined-with-label";
    export let autofocus = false;

    export let klass = "";
    let classes = ["mdc-text-field", "mdc-text-field--outlined"]
    let classesString = "";

    let labelId;

    $: if (label) {
        labelId = label.replace(/ /g, "");
    } else {
        labelId = Math.random().toString(20).substr(2, 6);
    }
    let element;
    let textField;
    onMount(() => {
        if (klass) {
            classes.push(klass);
        }
        classesString = classes.join(" ");
        textField = new MDCTextField(element);
        if(autofocus)
            textField.focus();
    });
    
</script>
<style>
    label {
        flex: 1;
        margin-right: 0.5rem;
    }
</style>

{#if type == "outlined-with-label"}
    <label class={classesString}
        bind:this={element} id="{labelId}">
        <input type="text" class="mdc-text-field__input" 
            bind:value={value} aria-labelledby="{labelId}">
        <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading"></span>
            {#if label}
                <span class="mdc-notched-outline__notch">
                    <span class="mdc-floating-label" id="my-label-id">{label}</span>
                </span>
            {/if}
            <span class="mdc-notched-outline__trailing"></span>
        </span>
    </label>
{:else if type == "full-width"}
    <label class="mdc-text-field mdc-text-field--filled mdc-text-field--fullwidth" bind:this={element}>
        <span class="mdc-text-field__ripple"></span>
        <input class="mdc-text-field__input" bind:value={value}
                type="text"
                placeholder="{label}"
                aria-label="{label}">
        <span class="mdc-line-ripple"></span>
    </label>
{:else if type == "filled-text"}
    <label class="mdc-text-field mdc-text-field--filled" bind:this={element}>
        <span class="mdc-text-field__ripple"></span>
        <input class="mdc-text-field__input" type="text" aria-labelledby="{labelId}" bind:value={value}>
        <span class="mdc-floating-label" id="{labelId}">{label}</span>
        <span class="mdc-line-ripple"></span>
    </label>
{/if}