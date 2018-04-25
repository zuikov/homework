'use strict'
// import {updateClockColor} from './main.js';
// Passes the data from form to the clock, filters the data and
// provides buttons and input fields
  let ua = navigator.userAgent,
    timerSettings = document.forms.setTimer,
    inputIvent = 'change';
  export const startButton = timerSettings.elements.startButton;
  export const pauseButton = timerSettings.elements.pauseButton;
  export const resetButton = timerSettings.elements.resetButton;
  export const minutesInput = timerSettings.elements.minutes;
  export const secondsInput = timerSettings.elements.seconds;

  // This is the hand-made polyfill for IE11   
  if (ua.search(/11.0/) > -1) {
    inputIvent = 'keyup';
  };

  // Pass the data from the input fields to the timer view
  // and update clock color
  minutesInput.addEventListener(inputIvent, function (e) {
    timer.innerHTML = minutesInput.value + ':' + secondsInput.value;
  });

  secondsInput.addEventListener(inputIvent, function (e) {
    restrictMaxValue(secondsInput);
    timer.innerHTML = minutesInput.value + ':' + secondsInput.value;
  });

  // Restricts incorrect insertion in the input fields
  minutesInput.oncontextmenu = () => { return false };
  secondsInput.oncontextmenu = () => { return false };

  minutesInput.addEventListener('keyup', (e) => {
    filterValue(minutesInput);
  });

  secondsInput.addEventListener('keyup', (e) => {
    filterValue(secondsInput);
    restrictMaxValue(secondsInput);
  });

  // Only number input is permitted due to the function bellow
  function filterValue(e) {
    e.value = e.value.replace(/[^0-9]+/g, '');
  };
  // This function restricts the max value for second input
  function restrictMaxValue(e) {
    if (e.value > 60) e.value = 60;
  };
  
