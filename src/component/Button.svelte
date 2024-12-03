<script lang="ts">
    import { onMount } from 'svelte';

    export let onClick = (_ : Event) : void => {};
    export let text : string = "";

	let root : Element;
	onMount(() => {
        root.addEventListener('click', onClick);
        return () => root.removeEventListener('click', onClick);
    });
</script>
<style lang="scss">
    #_root {
        text-align: center;
        color: #00d9ff;
	    transform: skew(-15deg);
        backdrop-filter: blur(10px);
        transition: all 0.5s ease-in-out;
	    border-radius: .25rem;
	    z-index: 0;
        .border {
	        transition: border 0.5s cubic-bezier(.6, -0.4, 0.2, 1.25);
	        .background {
		        position: absolute;
		        opacity: 0;
		        border-radius: .25rem;
		        background: linear-gradient(45deg, #ffffff20, #5fffe335);
		        transition: all 0.2s ease-in-out;
	        }
	        p {
                user-select: none;
                position: relative;
                padding: 2rem 4rem;
		        font-size: 2rem;
                &::after {
                    content: '';
                    position: absolute;
	                width: 100%;
	                height: 100%;
                    top: 0;
                    left: 0;
	                border: #00d9ff solid 1px;
	                border-radius: .25rem;
                }
	        }
            &::after {
                content: '';
                position: absolute;
	            width: 100%;
                height: 100%;
	            outline: #00d9ff solid 0;
	            border: #00d9ff solid 0;
	            transition: all 0.2s cubic-bezier(.6, -0.4, 0.2, 2.5);
                z-index: 1;
            }
        }
        &:hover {
		    .border {
			    .background {
				    opacity: 1;
			    }
			    &::after {
				    border-left: double .65rem;
				    border-right: double .65rem;
			    }
		    }
	    }
        &:active {
		    .border {
			    .background {
				    opacity: 1;
                    filter: brightness(.5);
			    }
			    &::after {
				    border-left: double .4rem;
				    border-right: double .4rem;
			    }
		    }
	    }
    }

</style>
<div bind:this={root} id="_root" class="container">
    <div class="border container w">
        <p class="filter-glow-after">{text}</p>
        <div class="w h background"></div>
    </div>
</div>