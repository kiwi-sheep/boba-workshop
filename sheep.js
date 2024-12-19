document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const kiwiElement = document.getElementById('kiwi');
    let width = kiwiElement.offsetWidth;
    let height = kiwiElement.offsetHeight;

    // Square properties
    const square = {
        x: 100,
        y: 100,
        size: 50,
        isDragging: false,
        dragStartX: 0,
        dragStartY: 0
    };

    

    // Draw function
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(square.x, square.y, square.size, square.size);
        requestAnimationFrame(draw);
    }

    // Mouse event handlers
    canvas.addEventListener('mousedown', (e) => {
        const mouseX = e.clientX - canvas.offsetLeft;
        const mouseY = e.clientY - canvas.offsetTop;
        
        if (mouseX > square.x && mouseX < square.x + square.size &&
            mouseY > square.y && mouseY < square.y + square.size) {
            square.isDragging = true;
            square.dragStartX = mouseX - square.x;
            square.dragStartY = mouseY - square.y;
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (square.isDragging) {
            square.x = e.clientX - canvas.offsetLeft - square.dragStartX;
            square.y = e.clientY - canvas.offsetTop - square.dragStartY;
        }
    });

    canvas.addEventListener('mouseup', () => {
        square.isDragging = false;
    });

    // Initialize canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Start animation
    draw();

    window.addEventListener('resize', () => {
        width = kiwiElement.offsetWidth;
        height = kiwiElement.offsetHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        console.log('Width:', width);
        console.log('Height:', height);
    });
});
