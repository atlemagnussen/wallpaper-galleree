<script>
    export let name;
    import { curRoute, curSearchParam, docTitle, isSpinning, isDarkTheme, userIsLoggedIn, currentFile } from "./store";
    curSearchParam.set(window.location.search);
    docTitle.set(name);
    import state from "./store/state.js";
    import "./services/pagestate.js";
    import "./services/userprofile.js";
    import Link from "./components/Link.svelte";
    import Login from "./components/LoginMenu.svelte";
    import ThemeToggle from "./components/ThemeToggle.svelte";
    import GlobalSpinner from "./components/GlobalSpinner.svelte";
    import Dialog from "./components/Dialog.svelte";
    import Picture from "./views/Picture.svelte";
    import Container from "./Container.svelte";
    import { onMount } from "svelte";

    let picDialogState = false;
    onMount(() => {
        curRoute.set(window.location.pathname);
        if (!history.state) {
            window.history.replaceState({ path: window.location.pathname }, "", window.location.href);
        }
        isSpinning.set(false);
        isDarkTheme.subscribe(val => {
            if (val)
                document.body.classList.add("dark-theme");
            else
                document.body.classList.remove("dark-theme");
        });
        currentFile.subscribe((val) => {
            if (val.filename !== "dummy")
                picDialogState = true;
        });
    });
    const handlerBackNavigation = (event) => {
        curRoute.set(event.state.path);
    };
</script>

<style>
    .logo {
        display: inline-block;
        height: 2.5rem;
        width: 2.5rem;
        line-height: 2.5rem;
        vertical-align: middle;
        text-align: center;
        display: inline-block;
        color: var(--main-color);
    }
    nav {
        display: block;
        user-select: none;
    }
    header {
        padding: 0 0.5rem;
    }
    .picframe {
        height: 100%;
    }
</style>
<svelte:window on:popstate="{handlerBackNavigation}" />
<!-- <svelte:body class:dark-theme="{$isDarkTheme}" />-->

<main>
    <header>
        <nav>
            <Link page="{{ path: '/', name: 'Home' }}">
                <div class="logo">GAL</div>
            </Link>
            {#if $userIsLoggedIn}
                <Link page="{{ path: '/new', name: 'New gallaree'}}" icon="create_new_folder" color="white" />
            {/if}
        </nav>
        <ThemeToggle />
        <Login />
    </header>
    
    <Container />
    <GlobalSpinner />
    <Dialog openState="{picDialogState}">
        <div class="picframe" slot="dlgContent" on:click={() => picDialogState = false}>
            <Picture />
        </div>
    </Dialog>
</main>

