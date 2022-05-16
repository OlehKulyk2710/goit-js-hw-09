import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// ---------- Without CLASS ----------

// let currentTime = null;
// let selectedTime = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     checkSelectedDate(selectedDates[0]);
//   },
// };

// flatpickr('#datetime-picker', options);

// const refs = {
//   startBtn: document.querySelector('[data-start]'),
//   dataDays: document.querySelector('[data-days]'),
//   dataHours: document.querySelector('[data-hours]'),
//   dataMinutes: document.querySelector('[data-minutes]'),
//   dataSeconds: document.querySelector('[data-seconds]'),
// };

// refs.startBtn.disabled = true;

// function checkSelectedDate(value) {
//   currentTime = Date.now();
//   selectedTime = value.getTime();

//   if (selectedTime <= currentTime) {
//     alert('Please choose a date in the future');
//   } else {
//     refs.startBtn.disabled = false;
//     refs.startBtn.addEventListener('click', onStartBtnClick);
//   }
// }

// function onStartBtnClick() {
//   refs.startBtn.disabled = true;
//   refs.startBtn.removeEventListener('click', onStartBtnClick);
//   setCountdown();
// }

// function setCountdown() {
//   let calculatedRemainTime = calculateRemainTime();
//   updateMarkup(calculatedRemainTime);

//   const timerId = setInterval(() => {
//     calculatedRemainTime = calculateRemainTime();
//     if (!calculatedRemainTime) {
//       clearInterval(timerId);
//       return;
//     }
//     updateMarkup(calculatedRemainTime);
//   }, 1000);
// }

// function calculateRemainTime() {
//   currentTime = Date.now();
//   const remainTime = selectedTime - currentTime;
//   if (remainTime < 0) {
//     return null;
//   }
//   const transformedRemainTime = transformTimetoDateTime(remainTime);
//   return transformedRemainTime;
// }

// function transformTimetoDateTime(time) {
//   const days = Math.floor(time / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
//   const secs = Math.floor((time % (1000 * 60)) / 1000);

//   return { days, hours, mins, secs };
// }

// function updateMarkup({ days, hours, mins, secs }) {
//   refs.dataDays.textContent = String(days).padStart(2, 0);
//   refs.dataHours.textContent = String(hours).padStart(2, 0);
//   refs.dataMinutes.textContent = String(mins).padStart(2, 0);
//   refs.dataSeconds.textContent = String(secs).padStart(2, 0);
// }

// ---------- END ----------

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkSelectedDate(selectedDates[0]);
  },
});

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

let newDate = null;

function checkSelectedDate(value) {
  newDate = value.getTime();

  if (newDate <= Date.now()) {
    refs.startBtn.disabled = true;
    Notify.failure('Please choose a date in the future', {
      position: 'center-top',
      distance: '100px',
    });
  } else {
    refs.startBtn.disabled = false;
    refs.startBtn.addEventListener('click', onStartBtnClick);
  }
}

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  refs.startBtn.removeEventListener('click', onStartBtnClick);
  timer.onStart(newDate);
}

// -------- Class --------

class CountDownTimer {
  constructor(markup) {
    this.currentTime = null;
    this.selectedTime = null;
    this.markup = markup;
  }

  onStart(date) {
    this.selectedTime = date;
    this.showTimer();
  }

  showTimer() {
    let calculatedRemainTime = this.calculateRemainTime();
    this.markup(calculatedRemainTime);

    const timerId = setInterval(() => {
      calculatedRemainTime = this.calculateRemainTime();
      if (!calculatedRemainTime) {
        clearInterval(timerId);
        return;
      }
      this.markup(calculatedRemainTime);
    }, 1000);
  }

  calculateRemainTime() {
    this.currentTime = Date.now();
    const remainTime = this.selectedTime - this.currentTime;

    if (remainTime / 1000 < 1 && remainTime >= 0) {
      Notify.success('Time is over!', {
        position: 'center-top',
        distance: '100px',
      });
    }

    if (remainTime < 0) {
      return null;
    }
    const transformedRemainTime = this.transformTimetoDateTime(remainTime);
    return transformedRemainTime;
  }

  transformTimetoDateTime(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    return { days, hours, mins, secs };
  }
}
// -------- End of Class --------

const timer = new CountDownTimer(updateMarkup);

function updateMarkup({ days, hours, mins, secs }) {
  refs.dataDays.textContent = String(days).padStart(2, 0);
  refs.dataHours.textContent = String(hours).padStart(2, 0);
  refs.dataMinutes.textContent = String(mins).padStart(2, 0);
  refs.dataSeconds.textContent = String(secs).padStart(2, 0);
}
