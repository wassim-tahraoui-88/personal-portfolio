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
	    position: relative;
	    display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
	    width: 100%;
	    height: 100%;
        color: #00d9ff;
	    transform: skew(-15deg);
        backdrop-filter: blur(10px);
        transition: all 0.5s ease-in-out;
	    border-radius: .25rem;
	    z-index: 0;
        .border {
	        position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
	        transition: border 0.5s cubic-bezier(.6, -0.4, 0.2, 1.25);
	        p {
                position: relative;
                padding: 1.5rem 2.5rem;
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
        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            border-radius: .25rem;
	        background: linear-gradient(45deg, #ffffff20, #5fffe335);
            transition: all 0.2s ease-in-out;
        }

        &:hover {
		    &::before {
                opacity: 1;
            }
		    .border {
			    &::after {
				    border-left: double .5rem;
				    border-right: double .5rem;
			    }
		    }
	    }
    }

</style>
<div bind:this={root} id="_root">
    <div class="border ">
        <p class="filter-glow-after">{text}</p>
    </div>
</div>