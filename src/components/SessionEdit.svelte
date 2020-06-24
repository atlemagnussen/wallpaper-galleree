<script>
    
    import helper from "../services/helper.js";
    import MButton from "../components/MButton.svelte";
    import MTextField from "../components/MTextField.svelte";
    import ExerciseEdit from "../components/ExerciseEdit.svelte";
    export let session;

    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    const addExercise = (session) => {
        if (!session)
            throw new Error(`no session for index ${i}`);
        
        if (!session.exercises) {
            session.exercises = [];
        } else {
            //ensure id 
            for (let i = 0; i < session.exercises.length; i++) {
                const ex = session.exercises[i];
                if (!ex.id) {
                    ex.id = helper.uuid();
                }
            }
        }
        const id = helper.uuid();
        session.exercises = [...session.exercises, { name: "", id, sets: "", reps: ""} ];
        dispatch("sessionchanged");
    }

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
    
    const dragstartHandler = (e) => {
        const draggedId = e.target.id;
        console.log(`dragStart id=${draggedId}`);
        e.dataTransfer.setData("draggedId", draggedId);
        e.dataTransfer.dropEffect = "move";
    }

    const forwardExerciseReorder = (e) => {
        dispatch("exercisereorder", e.detail);
    }
    
</script>
<style>
    section.session {
        display: flex;
        flex-direction: column;
    }
    section.session header{
        background: var(--third-color);
        display: flex;
        flex-direction: row;
        margin-bottom: 0.5rem;
    }
    div.sessions {
        display: flex;
        flex-direction: column;
    }
</style>

<section class="session">
    <header>
        <MTextField label="Session" bind:value={session.name}></MTextField>
        <MButton icon="add" on:click={() => addExercise(session)}>Add exercise</MButton>
    </header>
    {#if session.exercises}
        <div class="sessions"
        on:dragstart={dragstartHandler}
        >
            {#each session.exercises as exercise, i}
                <ExerciseEdit bind:exercise={exercise} on:exercisereorder={forwardExerciseReorder}/>
            {/each}
        </div>
    {:else}
        <p>no exercises yet</p>
    {/if}
    <br>
</section>