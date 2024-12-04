<script lang="ts">
	import { onMount } from 'svelte';
	import { EffectType, useEffect } from '../../utils/Effects';
	import { writable } from "svelte/store";

	type Position = { id: number, x : number, y : number };

	export let blinkColor = 'hsl(207,100%,85%)';
	export let cursorSize = 64;
	export let maxTrails = 128;
	export let blinkRate = 100;

	let cursor : Element;

	let trailMaxId = 0;
	let mouseX = 0, mouseY = 0;
	let trails = writable<Position[]>([]);

	const updateTrails = (event : MouseEvent) => {
		const { clientX : x, clientY : y } = event;
		trails.update((old : Position[]) : Position[] => [ ...old, { id: trailMaxId++, x, y } ].slice(-maxTrails));
	};

	const blinkOptions = { type: EffectType.BLINK, options: { timeout : { min: 100, max: 2000 }, apply: { color: blinkColor, duration: blinkRate } } };

    const cursorUpdate = { on: () => cursor.classList.add('click'), off: () => cursor.classList.remove('click') };

	const dataUpdate = (event: MouseEvent) => {
		mouseX = event.clientX;
		mouseY = event.clientY;
		updateTrails(event);
	};
	const animationUpdate = () => {
		// path.setAttribute('d', `M${startX} ${startY} L${mouseX} ${mouseY}`);
		// cursor.setAttribute('transform', `translate(${mouseX} ${mouseY})`);
		cursor.setAttribute('style', `top: ${ mouseY - cursorSize/2 }px; left: ${ mouseX - cursorSize/2 }px;`);
		requestAnimationFrame(animationUpdate);
	};

	onMount(() => {
		cursor.classList.remove('click');
		document.addEventListener('mousemove', dataUpdate);
		document.addEventListener('mousedown', cursorUpdate.on);
		document.addEventListener('mouseup', cursorUpdate.off);
		animationUpdate();

		return () => {
			document.removeEventListener('mousemove', dataUpdate);
			document.removeEventListener('mousedown', cursorUpdate.on);
			document.removeEventListener('mouseup', cursorUpdate.off);
		}
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
        width: 100vw;
		height: 100vh;
		overflow: hidden;
		.cursor {
            position: absolute;
            overflow: visible;
            circle {
                transition: transform 0.25s cubic-bezier(0.5, -0.4, 0.2, 2.5);
            }
            &.click {
                circle {
                    transform: scale(.5);
                }
            }
        }
		.swimmer {
			animation: swim 0.5s linear infinite;
		}

		.trail {
			position: absolute;
			width: .5rem;
			height: .5rem;
			background: radial-gradient(circle, white, transparent);
			border-radius: 50%;
			pointer-events: none;
			user-select: none;
			animation: fade-out 0.75s ease-out forwards;
		}
		@keyframes fade-out {
			0% {
				opacity: 1;
				transform: scale(1);
			}
			100% {
				opacity: 0;
				transform: scale(0);
			}
		}
	}
</style>
<div id="_root" class="container">
    {#each $trails as { id, x, y } (id)}
        <div class="trail filter-glow" style="left: calc({x}px - 0.25rem); top: calc({y}px - 0.25rem);"></div>
    {/each}
    <svg bind:this={cursor} class="cursor click" viewBox="0 0 {cursorSize/2} {cursorSize/2}" width={cursorSize} height={cursorSize}>
        <g transform="translate({cursorSize/4}, {cursorSize/4})" use:useEffect={blinkOptions}>
            <circle cx="0" cy="0" r="5" stroke="white" stroke-width="1" fill="none"/>
            <circle cx="0" cy="0" r="1" fill="white"/>
        </g>
    </svg>
<!--        <g bind:this={pointer} class="glow">
                <circle r="10" stroke="white" stroke-width="1" fill="none"/>
                <circle r="2" fill="white"/>
            </g>
            <path bind:this={path} class="glow swimmer" d="" fill="none" opacity="0"
                  stroke="white" stroke-width="2" stroke-dasharray="20 10 2" stroke-dashoffset="3"
                  style="transition: stroke-dasharray 1s ease 0s, stroke-dashoffset 2s ease 0s;"/>
            </svg>-->
</div>