<script lang="ts">
    import Control from '../component/Control.svelte';
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
</style>
<div class="stack-pane">
    <div bind:this={paneBase} class="pane main">
        <h1 class="filter-glow">Welcome</h1>
        <Button text="Load Data"/>
    </div>
    <div bind:this={paneOverlay} style="pointer-events: none;" class="pane overlay">
        <Control/>
    </div>
</div>