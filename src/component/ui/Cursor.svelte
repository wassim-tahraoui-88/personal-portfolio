<script lang="ts">
	import { onMount } from 'svelte';
	import Effects, { EffectType } from '../../utils/Effects';

	export let blinkColor = 'hsl(207,100%,85%)';
	const blinkRate = 100;
	let mouseX = 0, mouseY = 0;

	let cursor : Element, pointer : Element;

	function update() {
		// const startX = cursor.clientWidth / 2;
		// const startY = cursor.clientHeight / 2;
		// path.setAttribute('d', `M${startX} ${startY} L${mouseX} ${mouseY}`);
		(pointer as HTMLElement).style.transform = `translate(${mouseX}px, ${mouseY}px)`;

		// cursor.setAttribute('style', `top: ${ mouseX }; left: ${ mouseY };`);
		requestAnimationFrame(update);
	}

	onMount(() => {
		document.addEventListener('mousemove', (event) => {
			mouseX = event.clientX;
			mouseY = event.clientY;
		});
        Effects[EffectType.BLINK].setup(pointer, { timeout : { min: 100, max: 2000 }, apply: { color: blinkColor, duration: blinkRate } });
		update();
	});
</script>
<style lang="scss">
	@keyframes swim {
		0% {
			stroke-dasharray: 20 10 2;
			stroke-dashoffset: 64;
		}
		100% {
			stroke-dasharray: 20 10 2;
			stroke-dashoffset: 0;
		}
	}

	#_root {
		position: fixed;
        pointer-events: none;
        width: 100%;
        background: red;
        .cursor {
            position: absolute;
        }
		.swimmer {
			animation: swim 0.5s linear infinite;
		}
	}
</style>

<div id="_root" class="container">
    <svg id="cursor" class="cursor" opacity="0" width="100%" height="100%" bind:this={cursor}>
        <g bind:this={pointer}>
            <circle cx="0" cy="0" r="10" stroke="white" stroke-width="1" fill="none" class="pointer"/>
            <circle cx="0" cy="0" r="2" fill="white" class="pointer"/>
        </g>
    </svg>
<!--    <svg viewBox="0 0 720 480">-->
<!--        <g bind:this={pointer} class="glow">-->
<!--            <circle r="10" stroke="white" stroke-width="1" fill="none"/>-->
<!--            <circle r="2" fill="white"/>-->
<!--        </g>-->
<!--        <path bind:this={path} class="glow swimmer" d="" fill="none" opacity="0"-->
<!--              stroke="white" stroke-width="2" stroke-dasharray="20 10 2" stroke-dashoffset="3"-->
<!--              style="transition: stroke-dasharray 1s ease 0s, stroke-dashoffset 2s ease 0s;"/>-->
<!--    </svg>-->
</div>