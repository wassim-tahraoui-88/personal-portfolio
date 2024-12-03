<script lang="ts">
    import { onMount } from 'svelte';
    import { EffectType, useEffect } from '../utils/Effects';

    export let text : string = '';
    export let speed : number = 100;

	let output = '';
	let progress = 0;
	let interval : number = 0;

	const options = {
		type: EffectType.TYPEWRITER,
		options: { apply: { text, interval: speed }, timeout: {} }
	}
	const type = () => {
		if (progress >= text.length) {
            clearInterval(interval);
            return;
        }
		output += text.charAt(progress++);
	}

    onMount(() => {
        // interval = setInterval(() => type(), speed);
		// return () => clearInterval(interval);
    });
</script>
<div id="_root" class="container">
<!--    <div class="typewriter-container container" use:useEffect={options}>-->
<!--        <p class="typewriter-text">{output}<span class="typewriter-caret">&nbsp;_</span></p>-->
<!--    </div>-->
    <div class="container" use:useEffect={options}>
    </div>
</div>