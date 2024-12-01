<script lang="ts">
    import { onMount } from "svelte";

	export let blinkRate = 100;
	export let blinkColor = 'hsl(207,100%,85%)';
	export let easing = .5;

	let followerX = 0, followerY = 0;
	let mouseX = 0, mouseY = 0;
	let rotation = 0;

    let circle : Element, pointer : Element, path : Element, cursor : Element;

    const random = (min : number, max : number)  => Math.random() * (max - min) + min;

	const effectSetup = (effect : string, element : Element) => {
		switch (effect) {
			case 'blink': return effectSetupBlink(element);
			case 'spasm': return effectSetupSpasm(element);
		}
	}

    const effectSetupBlink = (element : Element) => {
	    effectApplyBlink(element);
	    setTimeout(() => effectSetupBlink(element), random(100, 2000));
    };
    const effectApplyBlink = (element : Element) => {
	    element.setAttribute('stroke', blinkColor);
	    element.classList.remove('glow');
	    setTimeout(() => {
		    element.setAttribute('stroke', 'white');
		    element.classList.add('glow');
	    }, blinkRate);
    };

    const effectSetupSpasm = (element : Element) => {
	    effectApplySpasm(element);
	    setTimeout(() => effectSetupSpasm(element), random(500, 2500)); // Schedule the next blink
    };
	const effectApplySpasm = (element : Element) => element.setAttribute('transform', `rotate(${random(-360, 360)})`);

    function update() {
	    const startX = cursor.clientWidth / 2;
	    const startY = cursor.clientHeight / 2;
	    path.setAttribute('d', `M${startX} ${startY} L${mouseX} ${mouseY}`);

	    const dx = mouseX - followerX;
	    const dy = mouseY - followerY;

	    followerX += dx * easing;
	    followerY += dy * easing;

	    rotation += .25;
	    circle.setAttribute('transform', `translate(${ followerX }, ${ followerY }) scale(0.5) rotate(${rotation % 360})`);
	    pointer.setAttribute('transform', `translate(${ mouseX }, ${ mouseY }) `);
	    requestAnimationFrame(update);
    }

    onMount(() => {
        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX
            mouseY = event.clientY;
        });
	    circle.querySelectorAll('g').forEach((element) => {
		    effectSetup('blink', element.firstElementChild!);
			effectSetup('spasm', element as Element);
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
    @keyframes group-rotate {
	    0% {
		    rotate: (0, 0, 0deg);
	    }
	    100% {
		    rotate: (0, 0, 360deg);
	    }
    }
    #_ {
        cursor: none;
	    width: 100%;
	    height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .cursor {
	        width: 100%;
	        height: 100%;
	        .pointer {
		        animation: group-rotate 2s linear infinite;
                g {
                    transition: transform 0.5s cubic-bezier(1, -0.4, 0.2, 1.25);
	                circle {
		                transform-origin: 0 0;
		                transition:
				                r  0.5s cubic-bezier(1, -0.4, 0.2, 2.5),
				                transform  0.5s cubic-bezier(1, -0.4, 0.2, 2.5),
				                stroke-dasharray 0.5s cubic-bezier(1, -0.4, 0.2, 2.5);
	                }
                }
		    }
	        &:active {
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
        .glow {
	        filter: drop-shadow(0 0 10px #00ffff) drop-shadow(0 0 20px #00ffff);
        }
        .swimmer {
            animation: swim 0.5s linear infinite;
        }
    }
</style>
<div id="_">
    <svg width="100%" height="100%" class="cursor" bind:this={cursor}>
        <path bind:this={path} class="glow swimmer" d="" fill="none" opacity="0"
              stroke="white" stroke-width="2" stroke-dasharray="20 10 2" stroke-dashoffset="3"
              style="transition: stroke-dasharray 1s ease 0s, stroke-dashoffset 2s ease 0s;"/>
        <g bind:this={pointer} class="glow" transform="translate(50%, 50%)">
            <circle r="10" stroke="white" stroke-width="2" fill="none"/>
            <circle  r="2.5" fill="white"/>
        </g>
        <g bind:this={circle} class="pointer" transform="translate(50%, 50%) scale(0.1)" fill="none" stroke="white" stroke-width="10">
            <g>
                <circle cx="0%" cy="0%" r="100"
                        stroke-dasharray="25 100 16"  style="transition-delay: .1s;"/>
            </g>
            <g>
                <circle cx="0%" cy="0%" r="80"
                        stroke-dasharray="120 25 16" style="transition-delay: .0s;"/>
            </g>
            <g>
                <circle cx="0%" cy="0%" r="60"
                        stroke-dasharray="120 25 16" style="transition-delay: .05s; transition: r 0.2s linear;"/>
            </g>
        </g>
    </svg>
</div>