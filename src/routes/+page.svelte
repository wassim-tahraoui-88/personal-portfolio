<script lang="ts">
    import Welcome from '../pages/Welcome.svelte';
    import { onMount } from 'svelte';
    onMount(() => {});
</script>
<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
	:global(*) {
		font-family: 'Orbitron', serif;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		cursor: url('/cursor.svg') 32 32, auto;
	}
	:global(body) {
		width: 100vw;
		height: 100vh;
	}
	:global(.stack-pane) {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
		.pane {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 100%;
			height: 100%;
		}
	}
	:global(.container) {
        position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
        overflow: visible;
	}
    :global(.flex) {
	    flex: 1 0 0;
    }
	:global(.w) {
		width: 100%;
	}
	:global(.h) {
		height: 100%;
	}

	:global(.row) {
		flex-direction: row;
	}
	:global(.column) {
		flex-direction: column;
	}

	:global(.text-glow) {
		position: relative;
		color: #fff;
		text-shadow: 0 0 10px #0ff, 0 0 20px #0ff;
		&::after {
			content: attr(data-text);
			position: absolute;
			width: 100%;
			height: 100%;
			top: 50%;
			left: 0;
			padding: 0;
			margin: 0;
			opacity: 0.75;
			text-wrap: nowrap;
			text-shadow: none;
			color: rgba(255, 255, 255, 0.6);
			font-weight: bolder;
			filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff) blur(0.05em);
			transform: perspective(50px) rotateX(45deg) scale(1.1, -.9);
		}
	}
	:global(.filter-glow) {
        overflow: visible;
		color: #fff;
		filter: drop-shadow(0 0 10px #0ff) drop-shadow(0 0 20px #0ff);
	}
	:global(.filter-glow-after) {
		&::after {
			color: #fff;
			filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff);
		}
	}

	#_root {
		background-color: #030514;
	}
</style>
<div id="_root" class="container flex h">
    <Welcome/>
</div>