<script>
    import { onMount, onDestroy } from "svelte";
    import Circle from "./Circle.svelte";
    import PopDown from "./PopDown.svelte";
    import { userIsLoggedIn, userProfile } from "../store";
    import Link from "../components/Link.svelte";

    onMount(() => {

    });

    const logOut = () => {
        firebase.auth().signOut();
        userIsLoggedIn.set(false);
        userProfile.set({ loggedIn: false, name: "Anon" });
    };

    let usernameOrEmail = "user";
    const unsub = userProfile.subscribe(val => {
        usernameOrEmail = val.email;
    });
    onDestroy(unsub);
</script>

<style>
    div {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
    }
</style>

<div>
    {#if $userIsLoggedIn}
        <PopDown>
            <div slot="btnContent">
                <Circle>{$userProfile.initials}</Circle>
            </div>
            <div slot="dlgContent" class="flex column">
                <div>
                    {@html usernameOrEmail}
                </div>
                <Link page="{{ path: '/account', name: 'Konto' }}" />
                <button icon="login" on:click={logOut}>Log out</button>
            </div>
        </PopDown>
    {:else}
        <Link page="{{ path: '/signin', name: 'Log in/Register'}}" icon="login" color="white" />
    {/if}

</div>
