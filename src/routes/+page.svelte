<script lang="ts">
    import Welcome from '../pages/Welcome.svelte';
    import { onMount } from 'svelte';
    // let paneOverlay : Element, paneBase : Element;

    onMount(() => {});
</script>
<style lang="scss">
</style>
<div id="_root" class="container">
    <Welcome/>
<!--    <div bind:this={paneBase} class="pane main">-->

<!--    </div>-->
<!--    <div bind:this={paneOverlay} style="pointer-events: none;" class="pane overlay">-->
<!--        <Cursor/>-->
<!--    </div>-->
</div>