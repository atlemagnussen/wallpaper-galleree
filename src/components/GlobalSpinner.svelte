<script>
    import { isSpinning } from "../store";
    import Spinner from "./Spinner.svelte";
</script>

<Spinner isSpinning={$isSpinning} />
