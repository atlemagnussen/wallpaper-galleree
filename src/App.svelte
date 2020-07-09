<script>
    export let name;
    import { curRoute, curSearchParam, docTitle, isSpinning, isDarkTheme } from "./store";
    curSearchParam.set(window.location.search);
    docTitle.set(name);
    import "./services/pagestate.js";
    import "./services/userprofile.js";
    import Link from "./components/Link.svelte";
    import Login from "./components/LoginMenu.svelte";
    import ThemeToggle from "./components/ThemeToggle.svelte";
    import Spinner from "./components/Spinner.svelte";
    import Container from "./Container.svelte";
    import { onMount } from "svelte";

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
</style>
<svelte:window on:popstate="{handlerBackNavigation}" />
<svelte:body class:dark-theme="{$isDarkTheme}" />

<Spinner />

<main>
    <header>
        <nav>
            <Link page="{{ path: '/', name: 'Home' }}">
                <div class="logo">GAL</div>
            </Link>
        </nav>
        <ThemeToggle />
        <Login />
    </header>
    
    <Container />
        
</main>


