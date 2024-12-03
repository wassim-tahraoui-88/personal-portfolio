<script lang="ts">
    // import { onMount } from 'svelte';

    import Welcome from '../pages/Welcome.svelte';
    import Cursor from '../component/ui/Cursor.svelte';

</script>
<style lang="scss">

	#_root {
		background-color: #030514;
	}

</style>
<div id="_root" class="container flex h-100">
    <Welcome/>
    <Cursor/>
</div>