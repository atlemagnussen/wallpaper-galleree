<script>
    import MTextField from "./MTextField.svelte";
    import MTextArea from "./MTextArea.svelte";
    export let exercise;

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    let dragover = false;

    const dragenterHandler = (e) => {
        //e.preventDefault();
        if (event.target.classList.contains("dropzone")) {
            event.target.style.background = "purple";
        }
    }
    const dragleaveHandler = (e) => {
        //e.preventDefault();
        if (event.target.classList.contains("dropzone")) {
            event.target.style.background = "blue";
        }
    }
    const dragoverHandler = (e) => {
        e.preventDefault();
        // e.dataTransfer.dropEffect = "move";
    };
    const dropHandler = (e) => {
        const draggedId = e.dataTransfer.getData("draggedId");
        if (exercise.id === draggedId) {
            console.log("no change");
        } else {
            dispatch('exercisereorder', { movingId: draggedId, nextToId: exercise.id});
        }
    };
</script>
<style>
    div {
        display: flex;
        flex-direction: row;
        margin-top: 0.5rem;
    }
    div.dragover {
        background: yellow;
    }
    span.draggable {
        cursor: pointer;
        user-select: none;
    }
</style>
<!--

-->
<div id="{exercise.id}"
    draggable=true
    on:dragstart
    class:dragover={dragover}
    class="dropzone"
    on:dragover={dragoverHandler}
    on:drop={dropHandler} 
    >
    <MTextArea bind:value={exercise.name} label="Exercise" klass="exercise-name"
        type="full-width" autofocus="true" />
    <MTextField bind:value={exercise.sets} label="sets" klass="exercise-sets" />
    <MTextField bind:value={exercise.reps} label="reps" klass="exercise-reps" />
    <span class="material-icons draggable">drag_indicator</span>
</div>
