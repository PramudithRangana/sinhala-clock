document.addEventListener("DOMContentLoaded", function () {
  const hourHand = document.querySelector("[data-hour-hand]");
  const minuteHand = document.querySelector("[data-minute-hand]");
  const secondHand = document.querySelector("[data-second-hand]");

  let totalMilliseconds = 0;
  let secondsCounter = 0;

  const rotationDeg = 360;

  function updateClock() {
    // Calculate Sinhala time with 12 minutes per hour
    const remainingMilliseconds = totalMilliseconds % (30 * 60 * 12 * 1000);
    const sinhalaSeconds = Math.floor((remainingMilliseconds % (rotationDeg * 12 * 1000)) / 1000); // 4319

    // Calculate degrees for each hand
    const minutes = (sinhalaSeconds / 12); //calculate minutes, changed %12 to /12 
    const hours = (sinhalaSeconds / 12 / 12); //calculate hours

    const hourDeg = Math.floor(hours) * 360 / 30;
    const minuteDeg = Math.floor(minutes) * 360 / 12; // Adjust for 12 steps. Math.floor activates the TICKING effect because it updates only on full minutes.
    const secondDeg = (sinhalaSeconds % 12) * 360 / 12; // Adjust for 12 steps

    // Apply rotations to the clock hands
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;

    // Update the previous second and seconds counter
    previousSecond = sinhalaSeconds;
    secondsCounter++;
  }

  // Update the total milliseconds and the clock every 1000 milliseconds (1 second)
  setInterval(function () {
    totalMilliseconds += 1000;
    updateClock();
  }, 1000);

  // Initial call to set the clock when the page loads
  updateClock();
});
