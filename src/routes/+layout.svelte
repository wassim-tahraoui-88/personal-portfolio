<script lang="ts">
	import '$assets/styles/app.scss';
	import { onMount } from 'svelte';
    import { trackMouse } from '$lib/stores/mouseStore';
	import Cursor from '$lib/components/atoms/Cursor.svelte';

    let { children } = $props();

    onMount(() => {
        window.addEventListener('mousemove', trackMouse);
	    return () => window.removeEventListener('mousemove', trackMouse);
    });
</script>
<style>
    #root {
        background-color: var(--background-color);
    }
</style>
<div id="root" class="container h-100 w-100 row">
    <div class="contents">{@render children()}</div>
    <Cursor/>
</div>
