<script>
    import MButton from "../components/MButton.svelte";
    import MTextField from "../components/MTextField.svelte";
    let email, pass;
    let regged = false;
    let message = "...";
    const regEmail = () => {
        regged = true;
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(() => {
                message = `Registration of ${email} complete, check your email to confirm`;
            })
            .catch((error) => {
                console.error(error);
                message =  `${error.message}(${error.code})`;
            });
    };
</script>

<style>
    article {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 300px;
    }
    form * {
        margin-bottom: 0.4rem;
    }
</style>
<article>
    {#if regged}
        <p>{message}</p>
    {:else}
        <div>
            <h2>Registrer deg</h2>

            <form>
                <MTextField bind:value="{email}" label="Email" />
                <MTextField bind:value="{pass}" label="Password" />
                <MButton icon="send" on:click="{regEmail}">Register</MButton>
            </form>
        </div>
    {/if}
</article>
