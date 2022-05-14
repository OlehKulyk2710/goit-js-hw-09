const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.stopBtn.disabled = false;
  refs.startBtn.disabled = true;

  refs.body.style.backgroundColor = getRandomHexColor();

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.stopBtn.addEventListener('click', onStopBtnClick);
}

function onStopBtnClick() {
  clearInterval(timerId);
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
  refs.stopBtn.removeEventListener('click', onStopBtnClick);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
