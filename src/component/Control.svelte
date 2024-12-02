<script lang="ts">
	import { onMount } from 'svelte';
	import EffectType from '../utils/EffectType';

	export let blinkRate = 100;
	export let blinkColor = 'hsl(207,100%,85%)';
	export let easing = .5;
	export let rotationSpeed = 20;

	let followerX = 0, followerY = 0;
	let mouseX = 0, mouseY = 0;
	let rotation = 0;

    let circle : Element, pointer : Element, path : Element, cursor : Element;

    const random = (min : number, max : number)  => Math.random() * (max - min) + min;

	const effects: { [key in EffectType] : any } = {
		[EffectType.BLINK]: {
			setup: (element : Element) => {
				effects[EffectType.BLINK].apply(element);
				setTimeout(() => effects[EffectType.BLINK].setup(element), random(100, 2000));
			},
			apply: (element : Element) => {
				element.setAttribute('stroke', blinkColor);
				element.classList.remove('filter-glow');
				setTimeout(() => {
					element.setAttribute('stroke', 'white');
					element.classList.add('filter-glow');
				}, blinkRate);
			},
        },
		[EffectType.SPASM]: {
	        setup: (element : Element) => {
		        effects[EffectType.SPASM].apply(element);
		        setTimeout(() => effects[EffectType.SPASM].setup(element), random(750, 4000));
	        },
	        apply: (element : Element) => element.setAttribute('transform', `rotate(${random(-270, 270)})`)
        }
	}

    function update() {
	    const startX = cursor.clientWidth / 2;
	    const startY = cursor.clientHeight / 2;
	    path.setAttribute('d', `M${startX} ${startY} L${mouseX} ${mouseY}`);

	    const dx = mouseX - followerX;
	    const dy = mouseY - followerY;

	    followerX += dx * easing;
	    followerY += dy * easing;

	    rotation += rotationSpeed * .01;
	    circle.setAttribute('transform', `translate(${ followerX }, ${ followerY }) scale(0.5) rotate(${rotation % 360})`);
	    pointer.setAttribute('transform', `translate(${ mouseX }, ${ mouseY })`);
	    requestAnimationFrame(update);
    }

    onMount(() => {
	    cursor?.classList.remove('click');
        document.addEventListener('mousemove', (event) => {
	        mouseX = event.clientX;
            mouseY = event.clientY;
        });
	    document.addEventListener('mousedown', () => cursor?.classList.add('click'));
	    document.addEventListener('mouseup', () => cursor?.classList.remove('click'));
	    circle.querySelectorAll('g').forEach((element) => {
		    effects[EffectType.BLINK].setup(element.firstElementChild!)
		    effects[EffectType.SPASM].setup(element);
	    });
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
	    width: 100%;
	    height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .cursor {
	        width: 100%;
	        height: 100%;
	        .pointer {
                g {
                    transition: transform 0.5s cubic-bezier(.6, -0.4, 0.2, 1.5);
	                circle {
		                transform-origin: 0 0;
		                transition:
				                r  0.5s cubic-bezier(1, -0.4, 0.2, 2.5),
				                transform  0.5s cubic-bezier(1, -0.4, 0.2, 2.5),
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
        .swimmer {
            animation: swim 0.5s linear infinite;
        }
    }
</style>
<div id="_root">
    <svg width="100%" height="100%" class="cursor click" bind:this={cursor}>
        <path bind:this={path} class="glow swimmer" d="" fill="none" opacity="0"
              stroke="white" stroke-width="2" stroke-dasharray="20 10 2" stroke-dashoffset="3"
              style="transition: stroke-dasharray 1s ease 0s, stroke-dashoffset 2s ease 0s;"/>
        <g bind:this={pointer} class="glow" transform="translate(50%, 50%)">
            <circle r="10" stroke="white" stroke-width="1" fill="none"/>
            <circle r="2" fill="white"/>
        </g>
        <g bind:this={circle} class="pointer" transform="translate(50%, 50%) scale(0.1)" fill="none" stroke="white" stroke-width="10">
            <g><circle cx="0%" cy="0%" r="100" stroke-dasharray="25 100 16" style="transition-delay: .1s;"/></g>
            <g><circle cx="0%" cy="0%" r="80" stroke-dasharray="120 25 16" style="transition-delay: .0s;"/></g>
            <g><circle cx="0%" cy="0%" r="60" stroke-dasharray="120 25 16" style="transition-delay: .05s; transition: r 0.2s linear;"/></g>
        </g>
    </svg>
</div>