<style>
    .path {
        fill: none;
        stroke: #3498db;
        stroke-width: 4;
        stroke-dasharray: 50 10 50 30 56 21 33;
        stroke-dashoffset: 500;
        animation: draw 2s linear infinite;
    }

    @keyframes draw {
        from {
            stroke-dashoffset: 500;
        }
        to {
            stroke-dashoffset: 0;
        }
    }
</style>
<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
    <!-- A sample path -->
    <path class="path" d="M10 150 C 110 50, 290 50, 390 150" />
</svg>