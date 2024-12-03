<style lang="scss">

    svg {
        overflow: visible;
	    circle {
		    width: 20px;
		    height: 20px;
		    background-color: red;
		    border-radius: 50%;
		    position: absolute;
		    offset-path: path('M 50 50 C 150 150, 250 220, 350 150');
		    animation: path-trail 2s ease-in-out infinite alternate;
	    }
    }

    @keyframes path-trail {
        0% {
            offset-distance: 0;
        }
        100% {
            offset-distance: 100%;
        }
    }

</style>
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <path id="myPath" d="M 50 50 C 150 150, 250 220, 350 150" class="filter-glow" fill="none" stroke="blue" />
    <circle class="filter-glow" r="10" fill="white"/>
</svg>



