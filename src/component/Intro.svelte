<script lang="ts">
	import { onMount } from 'svelte';
	import { EffectType, useEffect } from '$lib/actions/Effects';

	export let easing = .5;
	export let rotationSpeed = 20;
	export let size = 128;

	export let blinkColor = 'hsl(207,100%,85%)';
	const blinkRate = 100;
	let followerX = 0, followerY = 0;
	let mouseX = 0, mouseY = 0;
	let rotation = 0;

	const blinkOptions = { type: EffectType.BLINK, options: { timeout: { min: 100, max: 2000 }, apply: { color: blinkColor, duration: blinkRate } }};
	const spasmOptions = { type: EffectType.SPASM, options: { timeout: { min: 750, max: 4000 }, apply: { otherTransforms: 'scale(1)' } }};

    let circle : Element, svg : SVGSVGElement;

    function update() {
	    // const dx = mouseX - followerX;
	    // const dy = mouseY - followerY;

	    // followerX += dx * easing;
	    // followerY += dy * easing;

	    const centerX = svg.viewBox.baseVal.width / 2;
	    const centerY = svg.viewBox.baseVal.height / 2;

	    rotation += rotationSpeed * .01;
	    circle.setAttribute('transform', `translate(${centerX} ${centerY}) rotate(${ rotation % 360 })`);
	    requestAnimationFrame(update);
    }

    onMount(() => {
	    setTimeout(() => svg.classList.remove('click'), 1000);
        document.addEventListener('mousemove', (event) => {
	        mouseX = event.clientX;
            mouseY = event.clientY;
        });
        // document.addEventListener('mousedown', () => svg.classList.add('click'));
        // document.addEventListener('mouseup', () => svg.classList.remove('click'));
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
    @keyframes circle-rotate {
	    0% {
		    transform: rotateZ(0deg);
	    }
	    100% {
		    transform: rotateZ(360deg);
	    }
    }
    #_root {
        padding: 5rem;
	    svg {
		    overflow: visible;
		    .pointer {
			    transform-origin: 0 0;
		        g {
                    transition: transform 0.5s cubic-bezier(.6, -0.4, 0.2, 1.5);
	                circle {
		                transform-origin: 0 0;
		                transition:
				                r  0.5s cubic-bezier(1, -0.4, 0.2, 2.5),
				                transform 0.5s cubic-bezier(1, -0.4, 0.2, 2.5),
				                stroke-dasharray 0.5s cubic-bezier(1, -0.4, 0.2, 2.5);
	                }
                }
		    }
	        &.click {
                .pointer {
	                circle {
		                r: 5;
		                stroke-dasharray: 5;
		                stroke-dashoffset: 0;
		                animation: circle-rotate 0.5s linear infinite;
		                transition:
				                r 0.4s cubic-bezier(1, -0.4, 0.2, 1.25),
				                transform 0.4s cubic-bezier(1, -0.4, 0.2, 1.25),
				                stroke-dasharray 0.4s cubic-bezier(1, -0.4, 0.2, 1.25);
	                }
                }
	        }
        }
    }
</style>
<div id="_root" class="container flex">
    <svg width="100%" height="100%" viewBox="0 0 256 256" class="click" bind:this={svg}>
        <g bind:this={circle} class="pointer" fill="none" stroke="white" stroke-width="10">
            <g use:useEffect={ blinkOptions } use:useEffect={ spasmOptions }><circle cx="0%" cy="0%" r="100" stroke-dasharray="25 100 16" style="transition-delay: .1s;"/></g>
            <g use:useEffect={ blinkOptions } use:useEffect={ spasmOptions }><circle cx="0%" cy="0%" r="80" stroke-dasharray="120 25 16" style="transition-delay: .0s;"/></g>
            <g use:useEffect={ blinkOptions } use:useEffect={ spasmOptions }><circle cx="0%" cy="0%" r="60" stroke-dasharray="120 25 16" style="transition-delay: .05s; transition: r 0.2s linear;"/></g>
            <circle r="5" fill="white" stroke="none" stroke-width="0" class="filter-glow"/>
        </g>
    </svg>

</div>