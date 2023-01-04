(function(){
    let RAIN_INTENSITY = 0.3;
    let raindrops = [];
    let rainDrift;
    
    document.getElementById('rain_intensity_slider').oninput = function() {
        RAIN_INTENSITY = this.value / 100.0;
    }
    
    loop();
    
    function loop() {
        update();
        requestAnimationFrame(loop);
    }
    
    function update() {
        rainDrift = Math.sin(new Date() / 10_000) * 3;
        
        if (Math.random() < RAIN_INTENSITY) {
            createRaindrop(Math.random() * window.innerWidth, 10);
        }
        
        for (let raindrop of raindrops) {
            moveRaindrop(raindrop, raindrop.x + rainDrift, raindrop.y + 3);
        }
        
        const keepFlakes = [];
        for (let raindrop of raindrops) {
            if (raindrop.y > window.innerHeight) {
                document.body.removeChild(raindrop.div);
            } else {
                keepFlakes.push(raindrop);
            }
        }

        raindrops = keepFlakes;
    }

    function moveRaindrop(raindrop, x, y) {
        raindrop.x = x;
        raindrop.y = y;
        raindrop.div.style.left = `${x|0}px`;
        raindrop.div.style.top = `${y|0}px`;
    }
    
    function createRaindrop(x, y) {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.width = '5px';
        div.style.height = '5px';
        div.style.left = `${x|0}px`;
        div.style.top = `${y|0}px`;
        div.style.backgroundColor = `blue`;
        div.style.border = '1px solid blue';
        div.style.borderRadius = '25px';
        document.body.appendChild(div);
        raindrops.push({div, x, y});
    }
}());
