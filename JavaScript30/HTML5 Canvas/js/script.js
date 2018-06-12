const canvas = document.querySelector("#draw"); // Allows us to grab context
const ctx = canvas.getContext("2d"); // Where we affect the rainbow brush

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
// ctx.globalCompositeOperation = 'destination-over';
let isDrawing = false;
let direction = true;
// Lets us connect our various points
let lastX = 0;
let lastY = 0;
let hue = 0; // ranging from 0 to 360 for hue color

/**
 * When the mouse is clicked, and then held down, this function is called to
 * update lastX and lastY variables, to connect consecutive lines in a logical manner.
 * @param {*} e Mouse event
 */
function updateCoords(e) {
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Destructure array
}

/**
 * Function called to update the context brush, which paints to the canvas based
 * on class variables as well as the relative position of the mouse (so long as
 * the mouse is held down, and on the canvas)
 * @param {*} e Mouse event
 */
function draw(e) {
    if (!isDrawing) // Stop the function from running when they are not moused
        return;
    // Set hue variable from 0 to 360, painting all colors of the rainbow.
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // Start from
    ctx.lineTo(e.offsetX, e.offsetY); // Go to
    ctx.stroke();
    updateCoords(e); // Call helper fnctn
    hue = (hue+1) % 360;
    // If linewidth reaches either of the bounds, flip the direction: incr / decr
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1)
        direction = !direction;
    // Based on the direction boolean, change the width of the brushstroke
    ctx.lineWidth = (direction) ? ctx.lineWidth + 1 : ctx.lineWidth - 1;
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    updateCoords(e);
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false); // If the mouse goes off of the canvas