<script lang="ts">
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';
    import { EffectType, useEffect } from '$lib/actions/Effects';
    import { useLongPress } from '$lib/actions/MouseEvents';
    import { generateUICircles } from '$lib/actions/Generators';


    let { rotationSpeed = 20, pressDuration = 500, blinkRate = 100, blinkColor = 'hsl(207,100%,85%)' } = $props();
    let rotation = 0;

	const circles = generateUICircles({ maxRadius: 64, count: { min: 5, max: 10 }, strokeWidth: { min: 0.5, max: 3 }, offsetFactor: 5});
    const blinkOptions = { type: EffectType.BLINK, options: { timeout: { min: 100, max: 2000 }, apply: { filterClass: 'filter-glow', blinkClass: 'glow-on', color: blinkColor, duration: blinkRate } }};
    const spasmOptions = { type: EffectType.SPASM, options: { timeout: { min: 750, max: 4000 }, apply: { otherTransforms: '' } }};

    let pressable : Element, graphics : Element, svg : SVGSVGElement;

    const onClick = () => {
        console.log('Test');
    }

    function update() {
	    const htmlGraphics = graphics as HTMLElement;
	    htmlGraphics.style.translate = `50% 50%`;
	    htmlGraphics.style.rotate = `${ (rotation += rotationSpeed * .01) % 360 }deg`;
	    requestAnimationFrame(update);
    }
    onMount(() => {
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
	#root {
		user-select: text;
        width: 20rem;
        height: 20rem;
		svg {
			user-select: text;
			overflow: visible;
			.graphics {
				user-select: text;
                transform-origin: 0 0;
				transition: scale 0.25s cubic-bezier(.5, -0.4, 0.2, 2);
				g {
					user-select: text;
					transition: transform 0.5s cubic-bezier(.6, -0.4, 0.2, 1.5);
					circle {
						user-select: none;
						transform-origin: 0 0;
						transition:
								r  0.5s cubic-bezier(1, -0.4, 0.2, 2.5),
								transform 0.5s cubic-bezier(1, -0.4, 0.2, 2.5),
								stroke-dasharray 0.5s cubic-bezier(1, -0.4, 0.2, 2.5);
					}
				}
			}

            .touchable {
	            user-select: text;
            }
            &:has(.touchable:hover) {
                .graphics {
                    scale: 1.1;
                }
            }
			&:has(.touchable:active) {
				.graphics {
					scale: 0.9;
					circle {
						r: 5;
						stroke-dasharray: 5;
						stroke-dashoffset: 0;
						animation: circle-rotate 0.5s linear infinite;
						transition:
								r 0.1s cubic-bezier(1, -0.4, 0.2, 1.25),
								transform 0.1s cubic-bezier(1, -0.4, 0.2, 1.25),
								stroke-dasharray 0.1s cubic-bezier(1, -0.4, 0.2, 1.25);
					}
				}
			}
		}
	}
</style>
<div id="root" class="container" transition:slide draggable="false">
    <svg bind:this={svg} width="100%" height="100%" viewBox="0 0 256 256" >
        <g bind:this={graphics} class="graphics" fill="none" stroke="white" >
            {#each circles as { radius, strokeWidth, dashArray }, i}
                <g use:useEffect={ spasmOptions }>
                    <circle cx="0" cy="0" r={radius} stroke-width={strokeWidth} use:useEffect={ blinkOptions } stroke-dasharray="{dashArray}" style="transition-delay: {i * 50}ms;"/>
                </g>
            {/each}
            <circle r="1" fill="white" class="filter-glow glow-on"/>
            <circle bind:this={pressable} cx="0" cy="0" r="64" stroke="transparent" fill="transparent" class="touchable"
                    use:useLongPress={{ callback: onClick, data: { duration: pressDuration } }}/>
        </g>
    </svg>
</div>