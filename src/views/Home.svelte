<script>
    import Link from "../components/Link.svelte";
    import { userProfile } from "../store";
</script>

<h1>Welcome to Wallpaper Galleree</h1>
{#if $userProfile.loggedIn}
    <h3>Logged in as {$userProfile.name} ({$userProfile.email})</h3>
{:else}
    <h3>Not logged in</h3>
{/if}
