let hours = 00,
  min = 00,
  sec = 10;
const startBtn = document.getElementById("btn-toggle");
// user input in DOM
//const inputHr = document.getElementById("input_hh");
//const inputMin = document.getElementById("input_mm");
//const inputSec = document.getElementById("input_ss");

let timer = 0;
// changes class of start/pause button

// prepare for display with leading zeros
const addZero = (num) => {
  if (num < 10) {
    num = "0" + num;
    return num;
  } else {
    return num;
  }
};

const displayTime = () => {
  document.getElementById("hours").innerHTML = addZero(hours);
  document.getElementById("minutes").innerHTML = addZero(min);
  document.getElementById("seconds").innerHTML = addZero(sec);
};

const toggle = () => {
  console.log("start toggle");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (startBtn.id === "btn-toggle" && startBtn.value === "start") {
        resolve(() => {
          startBtn.value = "stop";
          startBtn.innerHTML = "Stop";
          timer = setInterval(runTimer, 1000);
        });
      } else {
        reject();
        startBtn.value = "start";
        startBtn.innerHTML = "Start";
        clearInterval(timer);
        timer = 0;
      }
    }, 1000);
  });
};

function timerIsSet(hours, min, sec) {
  console.log("start timerIsSet");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (hours === 00 && min === 00 && sec === 00) {
        reject("don't run the timer");
      } else {
        resolve("start the timer");
      }
    }, 500);
  });
}

function countDown() {
  console.log("countDown");
  return new Promise((resolve) => {
    setTimeout(() => {
      const counted = () => {
        if (sec !== 00) {
          sec--;
        } else if (min !== 00 && sec === 0) {
          sec = 59;
          min--;
        } else if (hours !== 0 && min === 0) {
          min = 60;
          hours--;
        }

        console.log(hours, min, sec);
        displayTime();
      };
      resolve(counted);
    }, 1000);
  });
}

const toggleAndSet = Promise.all([toggle(), timerIsSet(hours, min, sec)]);

startBtn.addEventListener("click", () =>
  toggleAndSet
    .then(countDown()) // if not - run countdown
    .catch((err) => console.error(err))
);
