const BIRTHDATE = new Date("2009-04-27T00:00:00");

function calculateExactAge() {
  const now = Date.now();
  const diff = now - BIRTHDATE.getTime();

  const milliseconds = diff % 1000;
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const years = Math.floor(days / 365.25);
  const remainingDays = days % 365.25;
  const months = Math.floor(remainingDays / 30.437);
  const finalDays = Math.floor(remainingDays % 30.437);

  return {
    years,
    months,
    days: finalDays,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

function updateDisplay() {
  const age = calculateExactAge();
  const pad = (n, digits) => String(n).padStart(digits, "0");

  const ageString = `
    <span class="highlight">${age.years}</span> Years 
    <span class="highlight">${age.months}</span> Months 
    <span class="highlight">${age.days}</span> Days 
    <span class="highlight">${pad(age.hours, 2)}</span> Hours 
    <span class="highlight">${pad(age.minutes, 2)}</span> Minutes 
    <span class="highlight">${pad(age.seconds, 2)}</span> Seconds 
    <span class="highlight">${pad(age.milliseconds, 3)}</span> Milliseconds
  `;

  document.getElementById("ageDisplay").innerHTML = ageString;
  requestAnimationFrame(updateDisplay);
}

updateDisplay();
