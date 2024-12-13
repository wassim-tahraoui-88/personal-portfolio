<script lang="ts">
	import { onMount } from 'svelte';
	import { EffectType, useEffect } from '$lib/actions/Effects';
	import { MousePosition } from '$lib/stores/mouseStore';
	import { blinkColor } from '$lib/stores/constants';
	import type { Position } from '$lib/types';

	let { cursorSize = 64, maxTrails = 128, blinkRate = 100 } = $props();

    let trailMaxId = 0;
	let trails = $state<Position[]>([]);
	let ripples = $state<Position[]>([]);

	let cursor : Element;

	const blinkOptions = { type: EffectType.BLINK, options: { timeout : { min: 100, max: 2000 }, apply: { filterClass: null, blinkClass: 'glow-on', color: blinkColor, duration: blinkRate } } };

	const updateTrails = (event : MouseEvent) => {
		const { x, y } = $MousePosition;
		trails = [ ...trails, { id: trailMaxId++, x, y } ].slice(-maxTrails);
	};
    const cursorUpdate = {
		on: (event : MouseEvent) => {
			event.preventDefault();
			cursor.classList.add('click');

			const ripple = {
				id: Date.now(),
				x: $MousePosition.x,
				y: $MousePosition.y,
			};

			ripples = [...ripples, ripple];

			setTimeout(() => ripples = ripples.filter(r => r.id !== ripple.id), 500);
		},
        off: (_ : MouseEvent) => {
	        cursor.classList.remove('click');
        }
	};

	const animationUpdate = () => {
		// path.setAttribute('d', `M${startX} ${startY} L${mouseX} ${mouseY}`);
		cursor.setAttribute('style', `top: ${ $MousePosition.y - cursorSize/2 }px; left: ${ $MousePosition.x - cursorSize/2 }px;`);
		requestAnimationFrame(animationUpdate);
	};

	onMount(() => {
		cursor.classList.remove('click');
		document.addEventListener('mousemove', updateTrails);
		document.addEventListener('mousedown', cursorUpdate.on);
		document.addEventListener('mouseup', cursorUpdate.off);
		animationUpdate();
		return () => {
			document.removeEventListener('mousemove', updateTrails);
			document.removeEventListener('mousedown', cursorUpdate.on);
			document.removeEventListener('mouseup', cursorUpdate.off);
		}
	});
</script>
<style lang="scss">
	#root {
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
			.pointer {
				&.glow-on {
					filter: drop-shadow(0 0 4px #fffa) drop-shadow(0 0 1px #0ffa) drop-shadow(0 0 0.5px #0ffa);
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
	.ripple {
		position: absolute;
		width: 2rem;
		height: 2rem;
		border: 1px solid var(--primary-color);
		background: var(--primary-radial);
		border-radius: 100%;
		scale: 1;
		opacity: 0.9;
		translate: -1rem -1rem;
		animation: ripple-effect 0.5s ease-out forwards;
	}
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
	@keyframes ripple-effect {
        to {
	        scale: 5;
			opacity: 0;
		}
	}
</style>
<div id="root" class="container">
    {#each trails as { id, x, y } (id)}
        <div class="trail filter-glow glow-on" style="left: calc({x}px - 0.25rem); top: calc({y}px - 0.25rem);"></div>
    {/each}
    <svg bind:this={cursor} class="cursor click" viewBox="0 0 {cursorSize/2} {cursorSize/2}" width={cursorSize} height={cursorSize}>
        <g class="pointer glow-on" transform="translate({cursorSize/4}, {cursorSize/4})" use:useEffect={blinkOptions}>
            <circle cx="0" cy="0" r="5" stroke="white" stroke-width="1" fill="none"/>
            <circle cx="0" cy="0" r="1" fill="white"/>
        </g>
    </svg>
    {#each ripples as ripple (ripple.id)}
        <div class="ripple" style="left: {ripple.x}px; top: {ripple.y}px;"></div>
    {/each}
<!--        <g bind:this={pointer} class="glow">
                <circle r="10" stroke="white" stroke-width="1" fill="none"/>
                <circle r="2" fill="white"/>
            </g>
            <path bind:this={path} class="glow swimmer" d="" fill="none" opacity="0"
                  stroke="white" stroke-width="2" stroke-dasharray="20 10 2" stroke-dashoffset="3"
                  style="transition: stroke-dasharray 1s ease 0s, stroke-dashoffset 2s ease 0s;"/>
            </svg>-->
</div>