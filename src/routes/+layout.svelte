<script lang="ts">
    import { onMount } from 'svelte';
    import { mouseTrack } from '$lib/store.js';

    let { children } = $props();

    onMount(() => {
        document.addEventListener('mousemove', mouseTrack);
	    return () => document.removeEventListener('mousemove', mouseTrack);
    });
</script>

{@render children()}