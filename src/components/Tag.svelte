<script>
    export let tag;
</script>
<style>
    span {
        display: inline-block;
        color: white;
        padding: 0.2rem 0.4rem;
        border-radius: 5px;
    }
</style>

<span style="background: {tag.color}">{tag.name}</span>