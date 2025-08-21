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

  // Create enhanced display with data attributes for styling
  const ageString = `
    <span class="highlight" data-text="${age.years}">${age.years}</span> Years 
    <span class="highlight" data-text="${age.months}">${age.months}</span> Months 
    <span class="highlight" data-text="${age.days}">${age.days}</span> Days 
    <span class="highlight" data-text="${pad(age.hours, 2)}">${pad(age.hours, 2)}</span> Hours 
    <span class="highlight" data-text="${pad(age.minutes, 2)}">${pad(age.minutes, 2)}</span> Minutes 
    <span class="highlight" data-text="${pad(age.seconds, 2)}">${pad(age.seconds, 2)}</span> Seconds 
    <span class="highlight" data-text="${pad(age.milliseconds, 3)}">${pad(age.milliseconds, 3)}</span> Milliseconds
  `;

  const ageDisplay = document.getElementById("ageDisplay");
  
  // Only update if content has changed to prevent unnecessary reflows
  if (ageDisplay.innerHTML !== ageString) {
    ageDisplay.innerHTML = ageString;
    
    // Trigger animation on highlights that changed
    const highlights = ageDisplay.querySelectorAll('.highlight');
    highlights.forEach((highlight, index) => {
      // Add a slight delay between each element's animation
      setTimeout(() => {
        highlight.style.animation = 'none';
        highlight.offsetHeight; // Trigger reflow
        highlight.style.animation = 'pulseRotate 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }, index * 50);
    });
  }
  
  requestAnimationFrame(updateDisplay);
}

// Add smooth page load effect
document.addEventListener('DOMContentLoaded', () => {
  // Start the age counter after a brief delay for dramatic effect
  setTimeout(() => {
    updateDisplay();
  }, 500);
});
