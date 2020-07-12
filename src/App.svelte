<script>
    export let name;
    import { curRoute, curSearchParam, docTitle, isSpinning, isDarkTheme, userIsLoggedIn, currentFile } from "./store";
    curSearchParam.set(window.location.search);
    docTitle.set(name);
    import "./services/pagestate.js";
    import "./services/userprofile.js";
    import Link from "./components/Link.svelte";
    import Login from "./components/LoginMenu.svelte";
    import ThemeToggle from "./components/ThemeToggle.svelte";
    import Spinner from "./components/Spinner.svelte";
    import Dialog from "./components/Dialog.svelte";
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
                document.body.classList.add("dark-theme")
            else
                document.body.classList.remove("dark-theme");
        });
        currentFile.subscribe((val) => {
            if (val.filename !== "dummy")
                picDialogState = true;
        })
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
    img.dialog {
        /* object-fit: contain; */
        object-fit: scale-down;
    }
</style>
<svelte:window on:popstate="{handlerBackNavigation}" />
<svelte:body class:dark-theme="{$isDarkTheme}" />

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
    <Spinner />
    <Dialog openState="{picDialogState}" background="--warning-color">
        <div slot="btnContent">
        </div>
        <div slot="dlgContent" class="flex column" on:click={() => picDialogState = false}>
            {#if picDialogState}
                <img class="dialog" alt={$currentFile.filename} src={$currentFile.url} />
            {/if}
            <p>
                <button on:click={() => picDialogState = false} icon="cancel" color="white">close</button>
            </p>
        </div>
    </Dialog>
</main>

