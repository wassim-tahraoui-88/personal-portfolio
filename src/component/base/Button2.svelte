<script lang="ts">
    import { onMount } from 'svelte';
    import { EffectType, useEffect } from '../../utils/Effects';
    import { generateUICircles } from '../../utils/Generators';

    export let onClick = (_ : Event) : void => {};

    export let easing = .5;
    export let rotationSpeed = 20;

    export let blinkColor = 'hsl(207,100%,85%)';
    const blinkRate = 100;
    let followerX = 0, followerY = 0;
    let mouseX = 0, mouseY = 0;
    let rotation = 0;

	const circles = generateUICircles({ maxRadius: 50, count: { min: 5, max: 10 }, strokeWidth: { min: 0.5, max: 3 }, offsetFactor: 5});

    const blinkOptions = { type: EffectType.BLINK, options: { timeout: { min: 100, max: 2000 }, apply: { color: blinkColor, duration: blinkRate } }};
    const spasmOptions = { type: EffectType.SPASM, options: { timeout: { min: 750, max: 4000 }, apply: { otherTransforms: '' } }};

    let circle : Element, svg : SVGSVGElement;

    function update() {
	    const dx = mouseX - followerX;
	    const dy = mouseY - followerY;

	    followerX += dx * easing;
	    followerY += dy * easing;

	    const centerX = svg.viewBox.baseVal.width / 2;
	    const centerY = svg.viewBox.baseVal.height / 2;

	    rotation += rotationSpeed * .01;
	    circle.setAttribute('transform', `translate(${ centerX } ${ centerY }) rotate(${ rotation % 360 }) scale(1)`);
	    requestAnimationFrame(update);
    }

    onMount(() => {
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
        width: 25rem;
        height: 25rem;
		svg {
			overflow: visible;

			width: 100%;
			height: 100%;
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
<div id="_root" class="container">
    <svg bind:this={svg} width="100%" height="100%" viewBox="0 0 256 256">
        <g bind:this={circle} class="pointer" fill="none" stroke="white" >
            {#each circles as { radius, strokeWidth, dashArray }, i}
                <g use:useEffect={ spasmOptions }>
                    <circle cx="0" cy="0" r={radius} stroke-width={strokeWidth} use:useEffect={ blinkOptions } stroke-dasharray="{dashArray}" style="transition-delay: {i * 0.05}s;"/>
                </g>
            {/each}
            <circle r="1" fill="white" class="filter-glow"/>
        </g>
    </svg>
</div>