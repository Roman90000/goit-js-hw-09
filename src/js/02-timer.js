import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
require("flatpickr/dist/themes/confetti.css");
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const btnStartEl = document.querySelector("[data-start]");
const timerDays = document.querySelector("[data-days]");
const timetHours = document.querySelector("[data-hours]");
const timerMinutes = document.querySelector("[data-minutes]");
const timerSeconds = document.querySelector("[data-seconds]");

btnStartEl.addEventListener("click", timerStart);

btnStartEl.disabled = true;
const fp = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    minDate: "today",
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
        const currentDate = new Date();
        const selectedDate = fp.selectedDates[0];
        
        if (currentDate < selectedDate) {
            btnStartEl.disabled = false;
            
        } else {
            Notify.failure('Please choose a date in the future')
            btnStartEl.disabled = true;
        }
    }   
});

let timerId = null;

function timerStart() {
    const selectedDate = fp.selectedDates[0];

    timerId = setInterval(() => {
        const currentDate = new Date();
        const countdown = selectedDate - currentDate;
        btnStartEl.disabled = true;

        if (!countdown) {
        clearInterval(timerId);
        return;
        }
    updateTimer(convertMs(countdown));
}, 1000);
};

function updateTimer({ days, hours, minutes, seconds }) {
    timerDays.textContent = `${days}`;
    timetHours.textContent = `${hours}`;
    timerMinutes.textContent = `${minutes}`;
    timerSeconds.textContent = `${seconds}`;
};

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

