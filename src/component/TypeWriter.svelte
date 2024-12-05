<script lang="ts">
    import { scale } from 'svelte/transition';
    import { EffectType, useEffect } from '$lib/actions/Effects';

    export let text : string = '';
    export let speed : number = 100;

	const options = {
		type: EffectType.TYPEWRITER,
		options: { apply: { text, interval: speed }, timeout: {} }
	}
</script>
<p id="_root" class="container" use:useEffect={options} transition:scale></p>