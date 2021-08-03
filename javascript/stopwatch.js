let hours = 000,
  min = 000,
  sec = 000,
  millisec = 0000,
  count = 0;

// prepare for display with leading zeros
const addZero = (num) => {
  if (num < 10) {
    num = "0" + num;
    return num;
  } else {
    return num;
  }
};

const dispMillis = (num) => {
  if (num < 1000 && num > 99) {
    num = "0" + num;
    return num;
  } else if (num < 99 && num > 9) {
    num = "00" + num;
    return num;
  } else if (num < 10) {
    num = "000" + num;
    return num;
  } else {
    return num;
  }
};

function newtimer() {
  hours = parseInt((count * 10) / 1000 / 60 / 60); // calculate hours
  min = parseInt((count * 10) / 1000 / 60); // calculate minutes
  sec = parseInt(((count * 10) / 1000) % 60); // calculate seconds
  millisec = parseInt((count * 10) % 1000); // calculate milliseconds

  count++; // increment in count.

  document.getElementById("milliseconds").innerHTML = dispMillis(millisec);
  document.getElementById("seconds").innerHTML = addZero(sec);
  document.getElementById("minutes").innerHTML = addZero(min);
  document.getElementById("hours").innerHTML = addZero(hours);
}

let timer = 0;

const toggle = (e) => {
  const target = e.target;
  if (target.id === "btn-toggle" && target.value === "start") {
    timer = setInterval(newtimer, 10);
    startBtn.value = "stop";
    startBtn.innerHTML = "Stop";
  } else {
    startBtn.value = "start";
    startBtn.innerHTML = "Start";
    clearInterval(timer);
    timer = 0;
  }
};

const startBtn = document.getElementById("btn-toggle");
startBtn.addEventListener("click", toggle);

const reset = (e) => {
  const target = e.target;
  if (target.id === "btn-reset") {
    clearInterval(timer);

    hours = 000;
    min = 000;
    sec = 000;
    millisec = 0000;
    count = 0;

    document.getElementById("milliseconds").innerHTML = dispMillis(millisec);
    document.getElementById("seconds").innerHTML = addZero(sec);
    document.getElementById("minutes").innerHTML = addZero(min);
    document.getElementById("hours").innerHTML = addZero(hours);
  }
};

const resetBtn = document.getElementById("btn-reset");
resetBtn.addEventListener("click", reset);
resetBtn.addEventListener("click", toggle);

let lapNow = null;

const addLap = (e) => {
  const target = e.target;

  const h = addZero(hours);
  const m = addZero(min);
  const s = addZero(sec);
  const mi = millisec;

  if (target.id === "btn-add-lap" && count !== 0) {
    lapNow = `${h}:${m}:${s}.${mi}`;

    const ulEl = document.getElementById("laps-list");
    const newLi = document.createElement("LI");
    newLi.innerHTML = ++ulEl.children.length + ". " + lapNow;

    ulEl.appendChild(newLi);
  }
};

const lapBtn = document.getElementById("btn-add-lap");
lapBtn.addEventListener("click", addLap);
