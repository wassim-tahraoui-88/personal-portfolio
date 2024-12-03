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
	            span {
		            color: red;
		            font-weight: bold;
		            opacity: 1;
		            animation: blink 0.5s steps(2) infinite alternate;
		            @keyframes blink {
			            from {
				            color: transparent;
			            }
			            to {
				            color: white;
			            }
		            }
	            }
            }
	    }
    }
</style>
<div id="_root" class="container">
    <div class="typewriter container">
        <!--// TODO: span color fix-->
        <p class="text">{output}<span style="color: white;" class="cursor">_</span></p>
    </div>
</div>