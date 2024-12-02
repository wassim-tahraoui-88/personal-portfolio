<script lang="ts">
    import Cursor from '../component/Cursor.svelte';
    import Button from '../component/Button.svelte';
    import { onMount } from 'svelte';
    let paneOverlay : Element, paneBase : Element;

    onMount(() => {});
</script>
<style lang="scss">
    .stack-pane {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .pane {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    .container {
	    position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
    }
</style>
<div class="stack-pane">
    <div bind:this={paneBase} class="pane main">
        <div class="container">
<!--            <Button text="Hello World"/>-->
        </div>
    </div>
    <div bind:this={paneOverlay} style="pointer-events: none;" class="pane overlay">
        <Cursor/>
    </div>
</div>