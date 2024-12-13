<script lang="ts">
    import { slide } from 'svelte/transition';
    import { type MouseEventCallback, useLongPress } from '$lib/actions/MouseEvents';
    import CircularGraphics from '$lib/components/atoms/CircularGraphics.svelte';

    let { onClick, pressDuration = 500 } : {
        onClick : MouseEventCallback,
        pressDuration : number
    } = $props();

    const longPressOptions = { callback: onClick, data: { duration: pressDuration } };
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
	}
</style>
<div id="root" class="container" transition:slide draggable="false" use:useLongPress={longPressOptions}>
    <CircularGraphics/>
</div>