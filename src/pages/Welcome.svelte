<script lang="ts">
    import { onMount } from 'svelte';
    import Intro from '../component/Intro.svelte';
    import Button from '../component/Button.svelte';
    import TypeWriter from '../component/TypeWriter.svelte';

    onMount(() => {});
</script>
<style lang="scss">
</style>
<div id="_root" class="container flex h row">
    <div class="container flex h column">
        <TypeWriter text="Hello and Welcome"/>
        <Button text="Join My World"/>
    </div>
    <div class="container flex h column"><Intro/></div>
</div>