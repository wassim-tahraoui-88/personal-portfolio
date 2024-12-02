<script>
    import Control from '../component/Control.svelte';
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
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
</style>
<div class="stack-pane">
    <div class="pane pane-base">
        <h1>Hello</h1>
        <h2>Welcome</h2>
        <p>To my personal portfolio website</p>
    </div>
    <div class="pane pane-top">
        <Control/>
    </div>
</div>