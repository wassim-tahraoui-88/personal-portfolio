<script lang="ts">
    import { onMount } from 'svelte';
    import LabelButton from '$lib/components/atoms/LabelButton.svelte';
    import TypewriterLabel from '$lib/components/atoms/TypeWriter.svelte';
    import GraphicButton from '$lib/components/molecules/GraphicButton.svelte';
    let visible = $state(false);

    onMount(() => {});
</script>
<style lang="scss">
</style>
<div id="_root" class="container flex row h-100">
    <div class="container flex h-100 column">
        <GraphicButton/>
        {#if visible}
            <TypewriterLabel text="Join My World"/>
        {/if}
        <LabelButton onClick={(event) => {}}>Join My World</LabelButton>
    </div>
</div>