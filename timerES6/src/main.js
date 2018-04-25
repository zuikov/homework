'use strict'
// Implements timer logic realization
import { dial, timer, getTime, blink, changeClockColor } from './clock.js';
import { startButton, pauseButton, resetButton, minutesInput, secondsInput } from './clockForm.js';
let isPause = false,
  isStart = false,
  timerId,
  timeCounter,
  activeColor = 'purple';

pauseButton.disabled = true;

// Controls for the form and timer elements
window.addEventListener('resize', function (e) {
  setActiveColor();
});

dial.addEventListener('click', function (e) {
  let target = e.target,
    currentSecond = +target.id;
  if (isNaN(currentSecond)) return currentSecond;
  let [m, s] = getTime();

  if (m == 0 && s > 0) {
    s = currentSecond;
    if (s < 10) s = '0' + s;
    timer.innerHTML = m + ':' + s;
    changeClockColor(1, activeColor, activeColor);
    changeClockColor(currentSecond + 1, 'grey', activeColor);
  };
});

startButton.addEventListener('click', function (e) {
  e.preventDefault();
  isStart = true;
  timeCounter();
  pauseButton.disabled = false;
  resetButton.disabled = true;
  changeClockColor(1, activeColor, activeColor);
  this.disabled = true;
});

pauseButton.addEventListener('click', function (e) {
  e.preventDefault();
  if (!isPause) {
    clearTimeout(timerId);
    pauseButton.innerHTML = 'Run the timer';
    isPause = true;
  } else {
    timeCounter();
    pauseButton.innerHTML = 'Pause the timer';
    isPause = false;
  };
});

resetButton.addEventListener('click', function (e) {
  e.preventDefault();
  startButton.disabled = false;
  pauseButton.disabled = true;
  minutesInput.disabled = false;
  secondsInput.disabled = false;
  minutesInput.value = '01';
  secondsInput.value = '10';
  timer.innerHTML = '01:10';
});

// Timer realisation
function setActiveColor() {
  var height = document.documentElement.clientHeight,
    width = document.documentElement.clientWidth;

  let [m, s] = getTime();

  if (width >= 1000 && height >= 700) {
    activeColor = 'purple';
  } else if (width >= 500 && width < 1000 && height >= 300 && height < 700) {
    activeColor = 'red';
  } else activeColor = 'blue';

  updateClockColor(m);
};

timeCounter = function () {
  let [m, s] = getTime();
  updateClockColor(m);
  if (s == 0) {
    if (m == 0) {
      pauseButton.disabled = true;
      resetButton.disabled = false;
      minutesInput.disabled = true;
      secondsInput.disabled = true;
      changeClockColor(1, 'grey', 'grey')
      return;

      m = 99;
    }
    m--;
    if (m < 10) m = '0' + m;
    s = 59;
  }
  else s--;

  if (m == 0) {
    changeClockColor(1, activeColor, activeColor);
    changeClockColor(s + 1, 'grey', activeColor);
  };

  if (m == 0 && s < 10) blink();
  if (s < 10) s = '0' + s;
  timer.innerHTML = m + ':' + s;
  timerId = setTimeout(timeCounter, 1000);
};


export function updateClockColor(minutes) {
  if (minutes != 0 && isStart) {
    changeClockColor(1, activeColor, activeColor);
  };
};


