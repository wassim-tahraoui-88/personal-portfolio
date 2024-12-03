<script lang="ts">
    import { onMount } from 'svelte';

    export let text : string = '';
    export let speed : number = 100;

	let output = '';
	let progress = 0;
	let interval : number;

	const type = () => output += text.charAt(progress++);

    onMount(() => {
        interval = setInterval(() => type(), speed);
		return () => clearInterval(interval);
    });
</script>
<style lang="scss">
    #_root {
	    .typewriter {
            .text {
	            color: #00d9ff;
	            font-size: 1.5rem;
	            .caret {
		            color: white;
		            font-weight: bold;
		            animation: blink .5s steps(1) infinite;
		            @keyframes blink {
			            0% {
				            opacity: 0;
			            }
			            50% {
                            opacity: 1;
			            }
		            }
	            }
            }
	    }
    }
</style>
<div id="_root" class="container">
    <div class="typewriter container">
        <p class="text">{output}<span class="caret">&nbsp;_</span></p>
    </div>
</div>