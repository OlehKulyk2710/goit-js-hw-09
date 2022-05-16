import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDelay: document.querySelector('[name="delay"]'),
  inputStep: document.querySelector('[name="step"]'),
  inputAmount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const firstDelay = Number(refs.inputDelay.value);
  const delayStep = Number(refs.inputStep.value);
  const amount = Number(refs.inputAmount.value);
  onExecute(firstDelay, delayStep, amount);
}

function onExecute(firstDelay, delayStep, amount) {
  for (let i = 1, delay = firstDelay; i <= amount; i += 1, delay += delayStep) {
    setTimeout(
      () =>
        createPromise(i, delay)
          .then(({ position, delay }) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
              position: 'left-top',
              distance: '100px',
              timeout: 2500,
            });
          })
          .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
              position: 'left-top',
              distance: '100px',
              timeout: 2500,
            });
          }),
      delay,
    );
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
}
