// Selection of various DOM elements used throughout the class
const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const allHands = document.querySelectorAll('.hand');
const clock = document.querySelector('.clock');
const clockFace = document.querySelector(".clock-face");
// Variables used for managing size between calls to scale
let scalar = 1.1;
let increasing = true;
let rotation = 0;

for (let idx = 0; idx < 12; idx++) { // 12 Hours on the clock
    let angle = (idx / 12) * 360; // 12 Tick angles
    let angleBox = document.createElement("div"), outerBox = document.createElement("div");
    angleBox.classList.add("tick");
    angleBox.style.transform = `rotate(${angle}deg)`
    outerBox.classList.add("tick-inside");
    // Create hour number HTML element, and styling
    let hourNumber = document.createElement("p");
    let tempIdx = (idx <= 3) ? idx + 12 : idx;
    let textNode = document.createTextNode(((tempIdx - 3)).toString());
    hourNumber.style.transform = `rotate(-115deg) translate(-100%)`;
    hourNumber.style.color = `white`;
    hourNumber.style.textShadow = `1px 1px black`;
    // Insert these new HTML elements inside of one another
    hourNumber.appendChild(textNode);
    outerBox.appendChild(hourNumber);
    angleBox.appendChild(outerBox); // Append rendered div inside of parent
    clockFace.insertBefore(angleBox, clockFace.childNodes[0]);
}

/**
 * Adjusts the transform css characteristic of the entire rendered clock,
 * chiefly scaling up and down the size.
 * Called Once every 15ms.
 */
function scale() {
    if (scalar == 1.21 || scalar == -.9) {
        increasing = !increasing; // Flip boolean
        scalar = scalar * -1; // Flip between positive / negative, grow / shrink
    }
    scalar = scalar + .001;
    // Accounts for numbers like 1.200000000002 which break the code
    scalar = parseFloat(Number.parseFloat(scalar).toFixed(3));
    clock.style.transform = (scalar > 0) ? `scale(${scalar}, ${scalar}) skew(12deg, 12deg)` : `scale(${scalar}, ${scalar}) rotate(180deg) skew(12deg, 12deg)`;
}

function rotateClock() {
    rotation = (rotation + 180); // Class variable, maintains rotation between calls
    let randTime = Math.floor((Math.random() * 3) + 1);
    clockFace.style.transform = `rotate(${rotation}deg)`;
    clockFace.style.transition = `transform ${randTime}s`;
}

/**
 * Update the clock displayed on the screen based on values obtained from the
 * JavaScript date class. Accounts for a bug which occurs when the second hand
 * strikes 0.
 */
function setDate() {
    const now = new Date();
    setSecond(now);
    setHour(now);
    setMinute(now);
    /* If seconds are 0, and the seconds hand is at the top, the transition needs
     *  to be removed. Otherwise, the transition rotates counterclockwise, giving
     * the appearance of a flicker. Removing this transition at this moment gets
     * rid of this effect.
     * NOTE: setting transition to '' will default the element back to the
     * original style sheet styling, aka "all 0.05s;" */
    const transitionFunc =  (now.getSeconds() === 0) ? (hand) => {hand.style.transition = 'none'} : (hand) => {hand.style.transition = ''};
    allHands.forEach(transitionFunc);
}

/**
 * Set the degree of the seconds hand. Called once every second by setDate().
 * @param {*} now Current Date
 */
function setSecond(now) {
    // Translate seconds into angle at 1/60 of clock
    const secondsDegrees = (now.getSeconds() / 60) * 360 + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`; // <- backticks
}

/**
 * Set the degree of the minutes hand. Called once every second by setDate().
 * @param {*} now Current Date
 */
function setMinute(now) {
    const minutesDegrees = (now.getMinutes() / 60) * 360 + 90;
    minsHand.style.transform = `rotate(${minutesDegrees}deg)`; // <- backticks
}

/**
 * Set the degree of the hour hand. Called once every second by setDate().
 * @param {*} now
 */
function setHour(now) {
    // Note 12 hour clock. Can easily be changed to military by dividing by 24 instead.
    const hoursDegrees = ( now.getHours() / 12) * 360 + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`; // <- backticks
}

// Think of as game loop.
setInterval(setDate, 1000);
setInterval(scale, 15);
clockFace.addEventListener('click', rotateClock);