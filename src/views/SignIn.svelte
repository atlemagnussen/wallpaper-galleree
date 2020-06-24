<script>
    import { userIsLoggedIn, curRoute } from "../store";
    import auth from "../services/authentication.js";
    import Link from "../components/Link.svelte";
    import MButton from "../components/MButton.svelte";
    import MTextField from "../components/MTextField.svelte";
    import GoogleLoginButton from "../components/GoogleLoginButton.svelte";

    let email, pass, msg = "";
    const loginGoogle = async () => {
        try {
            const res = await auth.loginGoogle();
            console.log(res);
        } catch(err) {
            msg = `${err.message} (${err.code})`;
            msg = `${msg}, email:${err.email}`;
            msg = `${msg}, cred:${err.credential}`;
        }
        curRoute.set("/");
    };
    const loginEmail = async () => {
        try {
            const res = await auth.loginEmailPass(email, pass);
            console.log(res);
        } catch(err) {
            console.error(err);
            msg = `${err.message} (${err.code})`;
        }
    };
    const forgotPassword = async () => {
        try {
            const res = await auth.sendForgotPasswordMail(email);
            console.log(res);
        }catch(err) {
            console.error(err);
        }
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
</style>
<article>
    {#if $userIsLoggedIn}
        <p>already logged in</p>
    {:else}
        <div>
            <h1>Log in</h1>
            <p>
                <GoogleLoginButton on:click={loginGoogle} />
            </p>
            <form>
                <p>{msg}</p>
                <MTextField bind:value="{email}" label="Email" />
                <MTextField bind:value="{pass}" label="Passord" />
                <MButton icon="login" on:click="{loginEmail}">Log in</MButton>
            </form>
            <p>
                <a href="#" on:click={forgotPassword}>Forgot password?</a>
            </p>
            <p>
                <Link page="{{ path: '/signup', name: 'New user?' }}" />
            </p>
        </div>
    {/if}
</article>
