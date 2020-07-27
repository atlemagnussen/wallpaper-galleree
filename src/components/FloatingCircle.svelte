<script>
    export let float = "right";
</script>
<style>
    
    div.float-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: fixed;
        top: 0;
        height: 100%;
        text-align: center;
    }
    div.right {
        right: 40px;
    }
    div.left{
        left: 40px;
    }
    span {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        height: 2.5rem;
        width: 2.5rem;
        line-height: 2.5rem;
        vertical-align: middle;
        border-radius: 50%;
        background: white;
        color: black;
        text-align: center;
        font-family: "Roboto Mono", monospace;
        cursor: pointer;
        border: 1px solid white;
        box-shadow: 2px 2px 3px #999;
    }
</style>
<div class="float-wrapper {float}" on:click>
    <span class="float">
        <slot>*</slot>
    </span>
</div>
