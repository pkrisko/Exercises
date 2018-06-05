const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const allHands = document.querySelectorAll('.hand');
const clock = document.querySelector('.clock');
let scalar = 1.1;
let increasing = true;

function scale() {
    if (increasing && scalar < 1.5) {
        scalar = scalar + .001;
    } else if (increasing && scalar == 1.5) {
        increasing = false;
        scalar = scalar * -1;
    }

    if (!increasing && scalar < -1.0) {
        scalar = scalar + .001;
    } else if (!increasing && scalar == -1.0) {
        increasing = true;
        scalar = scalar * -1;
    }

    scalar = parseFloat(Number.parseFloat(scalar).toFixed(3));
    clock.style.transform = `scale(${scalar}, ${scalar}) skew(15deg, 15deg)`;
    if (scalar  < 0)
        clock.style.transform = `scale(${scalar}, ${scalar}) rotate(180deg) skew(15deg, 15deg)`

}

for (let idx = 0; idx < 12; idx++) {
    let ele = document.createElement("div");
    ele.classList.add("tick");
    let angle = (idx / 12) * 360;
    ele.style.transform = `rotate(${angle}deg)`
    let ele2 = document.createElement("div");
    ele2.classList.add("tick-inside");
    ele.appendChild(ele2);
    const parent = document.querySelector(".clock-face");
    parent.insertBefore(ele, parent.childNodes[0]);
    // parent.appendChild(ele);
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

// Run the setDate() function every 1000ms (one second). Think of as game loop.
setInterval(setDate, 1000);
setInterval(scale, 15);