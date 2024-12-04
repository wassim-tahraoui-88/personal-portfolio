<script lang="ts">
    import { EffectType, useEffect } from '../utils/Effects';

    export let text : string = '';
    export let speed : number = 100;

	const options = {
		type: EffectType.TYPEWRITER,
		options: { apply: { text, interval: speed }, timeout: {} }
	}
</script>
<p id="_root" class="container" use:useEffect={options}></p>