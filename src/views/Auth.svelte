<script>
    import { onMount } from "svelte";
    import rest from "../services/restService.js";
    const url = "https://us-central1-nugmeg-project.cloudfunctions.net/helloWorld/hello";

    let ans = "..."
    onMount(() => {
        let a = rest.get(url);
        ans = JSON.stringify(a, null, 4);
    });
</script>

<div>
    {ans}

</div>