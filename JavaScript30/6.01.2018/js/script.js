const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const hand = document.querySelector('.hand');

function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    console.log(seconds);
    // Debug the transition spaz every minute at top
    if (seconds === 59 || seconds === 0) {
        console.log("flagging");
        hand.removeAttribute("transition");
    } else {
        hand.style.transition = `transition: all 0.05s`;
    }
    setSecond(now);
    setHour(now);
    setMinute(now);
}

function setSecond(now) {
    const seconds = now.getSeconds();
    // Translate seconds into angle at 1/60 of clock
    const secondsDegrees = (seconds / 60) * 360 + 90; 
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
}

function setMinute(now) {
    const minutes = now.getMinutes();
    const minutesDegrees = (minutes / 60) * 360 + 90;
    minsHand.style.transform = `rotate(${minutesDegrees}deg)`;
}

function setHour(now) {
    const hours = now.getHours();
    const hoursDegrees = (hours / 12) * 360 + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

// Run the setDate() function every 1000ms (one second). Think of as game loop.
setInterval(setDate, 1000);