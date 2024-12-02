<style>
    .container {
        display: flex;
        flex-direction: column; /* Stack items vertically */
        align-items: center; /* Center items horizontally */
        position: relative;
        width: 300px;
        height: 300px;
        border: 1px solid #000;
    }

    .item {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: lightblue;
        border: 1px solid #000;
        opacity: .25;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item1 {
        z-index: 1;
    }

    .item2 {
        z-index: 2;
    }

    .item3 {
        z-index: 3;
    }
</style>
<div class="container">
    <div class="item item1">Item 1</div>
    <div class="item item2">Item 2</div>
    <div class="item item3">Item 3</div>

</div>