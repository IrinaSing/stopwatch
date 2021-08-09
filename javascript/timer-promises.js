let hours = 00,
  min = 00,
  sec = 00,
  count = 0;

// timer display in DOM
let setHours = document.getElementById("hours").innerHTML;
let setMin = document.getElementById("minutes").innerHTML;
let setSec = document.getElementById("seconds").innerHTML;

// button reset clears up timer values
const reset = () => {
  console.log("reset");
  hours = 00;
  min = 00;
  sec = 00;
  count = 0;
  displayTime();
  startBtn.value = "start";
  startBtn.innerHTML = "Start";
};
const resetBtn = document.getElementById("btn-reset");
resetBtn.addEventListener("click", reset);

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
    count = hours * 60 * 60 + min * 60 + sec;
    console.log(count);
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
    min = toInteger; //num
    sec = 00; // string. why?
    count = hours * 60 * 60 + min * 60 + sec;
    console.log(count, "preset count");
    displayTime();
  }
};

const displayTime = () => {
  console.log("display time");
  document.getElementById("hours").innerHTML = addZero(hours);
  document.getElementById("minutes").innerHTML = addZero(min);
  document.getElementById("seconds").innerHTML = addZero(sec);
};

const presetContainer = document.getElementById("presetCont");
presetContainer.addEventListener("click", setPreset);

// Nitpicky comment but now this function will sometimes return a string and sometimes return a number value
// e.g. addZero(5) will return "05", whereas addZero(12) will return 12 instead of "12"
// it is cleaner to return the 12 as a string as well in this example, this way it is clear that this value is no longer intended for calculations after this point.
const addZero = (num) => {
  if (num < 10) {
    num = "0" + num;
    num = num.toString();
    return num;
  } else {
    num = num.toString();
    return num; // check if toString works
  }
};

// the toggle function itself should toggle the button from start to stop or vice-versa
// and make sure that the timer starts counting down when start is pressed
//
// this operation itself is not waiting for anything to be completed before it can continue and as such it does not need to return a Promise
//
// The logic for the function should be nearly identical to the implementation in stopwatch.js
// only instead of doing timer = setInterval(newtimer, 10); you should instead call countDown for the very first time
// we will not need any setInterval calls in this whole file
let timer = 0;

const toggle = (e) => {
  const target = e.target;
  if (target.id === "btn-toggle" && target.value === "start") {
    timer = countDownTemplate();
    startBtn.value = "stop";
    startBtn.innerHTML = "Stop";
  } else {
    timer = false;
    startBtn.value = "start";
    startBtn.innerHTML = "Start";
    timer = 0;
  }
};

// Is there a reason we have to wait 500 milliseconds before we can say whether hours === 00 && min === 00 && sec === 00?
// Do we need a promise here or can we directly return the answer to that question?
//
// try to keep in mind why promises are used, a promise represent something that at some point in the future will resolve to a value...
// If we can immediately return the desired value and we do not gain anything by waiting we should not use a Promise.

// deleted func

// this function is where the magic will happen
// try to think about this countDown function as 1 step in the countdown process that will subtract exactly one
// second from the remaining time after one second before calling itself again
// until there is no more time left on the clock
//
// Take a look at the countDownTemplate function I provided for some inspiration on what this function should do
function newtimer() {
  console.log("new timer");
  console.log(hours, sec, min);
  count--; // increment in count.
  console.log(count, "count");

  min = Math.floor(count / 60);
  console.log(min, "min");
  sec = count - min * 60;
  console.log(sec, "sec");
  hours = Math.floor(count / 3600);
  console.log(hours, "hours");
  /*
  hours = Math.floor((count % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  min = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
  sec = Math.floor((count % (1000 * 60)) / 1000);

  /*
  hours = parseInt((count * 10) / 1000 / 60 / 60); // calculate hours
  min = parseInt((count * 10) / 1000 / 60); // calculate minutes
  sec = parseInt(((count * 10) / 1000) % 60); // calculate seconds
*/
  displayTime();
}

/**
 * I am a function that returns a Promise that will resolve after 1 second!
 *
 * This means that when someone registers a '.then' callback on my result, that callback will be called after 1 second
 */
function waitOneSecond() {
  console.log("wait1sec");
  return new Promise((resolve, reject) => {
    // this code will be executed immediately!
    setTimeout(() => {
      // one second has passed, this means that I can resolve my promise!
      resolve("1 second has passed!");
    }, 1000);
  });
}
function countDownTemplate() {
  console.log("countDownTemplate");
  // I will wait for one second, and then perform one step of the countdown process!
  waitOneSecond().then(() => {
    // if I reach this part it means one second has passed!
    // Did the user press the stop button in the meantime? If he did I can probably stop counting from here!
    if (startBtn.value === "start") {
      console.log("stop pressed", startBtn.value);
      console.log(count, "btn pressed or not");
      return;
    } else if (count !== 0) {
      console.log("count in countdown", count);
      newtimer();
    }
    // I can probably perform some logic here do decrement the seconds/minutes/hours!

    // Did I finish my countdown? If I did I can probably stop counting from here!
    if (count === 0) {
      reset();
    } else {
      countDownTemplate();
    }
    // otherwise I should probably continue the countdown by one step!
    // luckily I know just the function I can call that will decrement the timer over 1 second...
  });
}

// pressing the startbutton can call the toggle function directly, there is nothing it should wait for
const startBtn = document.getElementById("btn-toggle");
startBtn.addEventListener("click", toggle);
