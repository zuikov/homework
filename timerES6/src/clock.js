'use strict'
// Creates a clock dial and a clock timer and exports 
// public properties and methods 
let dashes = [],
    angle = 0;

export const dial = document.getElementById('clock');
export const timer = document.getElementById('timer');

      for (let i = 1; i <= 60; i++) {
        let currentDash = dashes[i];
        currentDash = document.createElement('div');
        currentDash.setAttribute('class', 'dash');
        currentDash.setAttribute('id', i);

        currentDash.style.MozTransformOrigin = '0 5.0em';
        currentDash.style.WebkitTransformOrigin = '0 5.0em';
        currentDash.style.OTransformOrigin = '0 5.0em';
        currentDash.style.MsTransformOrigin = '0 5.0em';
        currentDash.style.transformOrigin = '0 5.0em';

        currentDash.style.MozTransform = 'rotate(' + angle + 'deg)';
        currentDash.style.WebkitTransform = 'rotate(' + angle + 'deg)';
        currentDash.style.OTransform = 'rotate(' + angle + 'deg)';
        currentDash.style.MsTransform = 'rotate(' + angle + 'deg)';
        currentDash.style.transform = 'rotate(' + angle + 'deg)';

        dashes[i] = currentDash;
        dial.appendChild(dashes[i]);
        angle += 6;
      };
  
  export function getTime() {
      let time = timer.innerHTML;
      return time.split(':');
    };

  export function blink() {
      if (timer) {
        timer.style.color = 'red';
        setTimeout(function () {
          timer.style.color = 'black';
        }, 500);
      };
    };

  export function changeClockColor(dashNumber, dashColor, timerColor) {
      dashColor = dashColor || 'purple';
      timerColor = timerColor || 'purple';
      for (let i = dashNumber; i <= 60; i++) {
        dashes[i].style.background = dashColor;
      };
      timer.style.color = timerColor;
    };

