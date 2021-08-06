let hours = 00,
  min = 00,
  sec = 00;

// timer display in DOM
let setHours = document.getElementById("hours").innerHTML;
let setMin = document.getElementById("minutes").innerHTML;
let setSec = document.getElementById("seconds").innerHTML;

// user clicks button set and values from input goes into timer
// it doesn't work
const manualSet = (e) => {
  const target = e.target;
  // user input in DOM
  const inputHr = document.getElementById("input_hh");
  const inputMin = document.getElementById("input_mm");
  const inputSec = document.getElementById("input_ss");

  if (target.id === "set") {
    reset();
    hours = Number(inputHr.value);
    min = Number(inputMin.value);
    sec = Number(inputSec.value);
    displayTime();
  }
};

const setBtn = document.getElementById("set");
setBtn.addEventListener("click", manualSet);

// user clicks one one of preset buttons and it goes into timer
const setPreset = (e) => {
  const target = e.target;
  if (target.tagName === "BUTTON") {
    reset();
    const presetValue = target.dataset.timer;
    const toInteger = parseInt(presetValue, 10);
    hours = 00;
    min = toInteger;
    sec = 00;
    displayTime();
  }
};

const displayTime = () => {
  document.getElementById("hours").innerHTML = addZero(hours);
  document.getElementById("minutes").innerHTML = addZero(min);
  document.getElementById("seconds").innerHTML = addZero(sec);
};

const presetContainer = document.getElementById("presetCont");
presetContainer.addEventListener("click", setPreset);

// button reset clears up timer values
const reset = () => {
  hours = 00;
  min = 00;
  sec = 00;
  //stop the timer after pressing "reset"
  clearInterval(timer);
  displayTime();
  startBtn.value = "start";
  startBtn.innerHTML = "Start";
};

const toggle = (e) => {
  const target = e.target;
  if (target.id === "btn-toggle" && target.value === "start") {
    startBtn.value = "stop";
    startBtn.innerHTML = "Stop";
    timer = setInterval(runTimer, 1000);
  } else {
    startBtn.value = "start";
    startBtn.innerHTML = "Start";
    clearInterval(timer);
    timer = 0;
  }
};

const resetBtn = document.getElementById("btn-reset");
resetBtn.addEventListener("click", reset);

// button start runs the countdown
const runTimer = () => {
  //logic
  if (hours === 00 && min === 00 && sec === 00) {
    reset();
  } else if (sec !== 00) {
    sec--;
  } else if (min !== 00 && sec === 0) {
    sec = 59;
    min--;
  } else if (hours !== 0 && min === 0) {
    min = 60;
    hours--;
    console.log(hours, min, sec);
  }
  displayTime();
};

let timer = 0;
// changes class of start/pause button

const startBtn = document.getElementById("btn-toggle");
startBtn.addEventListener("click", toggle);

// prepare for display with leading zeros
const addZero = (num) => {
  if (num < 10) {
    num = "0" + num;
    return num;
  } else {
    return num;
  }
};
