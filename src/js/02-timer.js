import flatpickr from "flatpickr";
// Import suplimentar de stil
import "flatpickr/dist/flatpickr.min.css";

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const startButton = document.querySelector("button[data-start]");
const datetimePicker = document.getElementById("datetime-picker");
const timerDisplay = document.querySelector(".timer");
let countdownInterval;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate= selectedDates[0];
    if (selectedDate <= new Date()) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    }
    else{
      startButton.disabled = false;
    }
  },
};
 flatpickr (datetimePicker , options);

 startButton.addEventListener ('click', () => {
  const endDate = new Date (datetimePicker.value);
  if (endDate <= new Date()) {
    window.alert('Please choose a date in the future');
    return;
 }
  startButton.disabled = true;

  countdownInterval = setInterval(() =>{
    const now = new Date();
    const timeLeft = endDate - now;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      timerDisplay.textContent = '00:00:00:00';
      startButton.disabled = false;
      return;
    }
    const { days,hours,minutes,seconds} = convertMs(timeLeft);
    timerDisplay.textContent = `${addLeadingZero(days)}:${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`
  }, 1000);

 })