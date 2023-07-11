import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
require("flatpickr/dist/themes/confetti.css");
import { Notify } from 'notiflix/build/notiflix-notify-aio';


// const inputEl = document.querySelector("#datetime-picker")
const btnStartEl = document.querySelector("[data-start]");
const timerDays = document.querySelector("[data-days]");
const timetHours = document.querySelector("[data-hours]");
const timerMinutes = document.querySelector("[data-minutes]");
const timerSeconds = document.querySelector("[data-seconds]");

// btnStartEl.disabled = true;

btnStartEl.addEventListener("click", timerStart);


// console.log()
const fp = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
        currentDate = new Date();
        console.log(currentDate)
        
        if (selectedDates[0] - currentDate > 0) {
            btnStartEl.disabled = false;
        } else {
            btnStartEl.disabled = true;
            Notify.failure('Please choose a date in the future')
        }
    }   
});



function timerStart() {
    const selectedDate = fp.selectedDates[0];

    timerId = setInterval(() => {
        const currentDate = new Date();
        const countdown = selectedDate - currentDate;
        btnStartEl.disabled = true;

        if (countdown < 0) {
        clearInterval(timerId);
        return;
        }
    updateTimer(convertMs(countdown));
  }, 1_000);
};

function updateTimer({ days, hours, minutes, seconds }) {
    timerDays.textContent = `${days}`;
    timetHours.textContent = `${hours}`;
    timerMinutes.textContent = `${minutes}`;
    timerSeconds.textContent = `${seconds}`;
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
};

