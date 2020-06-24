<script>
    import {onMount} from "svelte";
    import {MDCTextField} from '@material/textfield';
    // export let label = "";
    export let value = "";
    export let autofocus = false;
    export let klass = "";
    let classes = ["mdc-text-field", "mdc-text-field--textarea", "mdc-text-field--no-label"]
    let classesString = "";

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
<label class={classesString} bind:this={element}>
    <textarea class="mdc-text-field__input" rows="1" cols="40" aria-label="Label" 
        bind:value={value}></textarea>
    <span class="mdc-notched-outline">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__trailing"></span>
    </span>
</label>