<script lang="ts">
    import { onMount } from 'svelte';
    import Intro from '../component/Intro.svelte';
    // import Button from '../component/base/Button.svelte';
    import TypewriterLabel from '../component/TypeWriter.svelte';
    import Button2 from '../component/base/Button2.svelte';
    let visible = $state(false);

    onMount(() => {});
</script>
<style lang="scss">
</style>
<div id="_root" class="container flex row h-100">
    <div class="container flex h-100 column">
        <Button2/>
        {#if visible}
            <TypewriterLabel text="Join My World"/>
        {/if}
<!--        <Button2 onClick={(event) => {}}>Join My World</Button2>-->
    </div>
    <div class="container flex h-100 column"><Intro/></div>
</div>