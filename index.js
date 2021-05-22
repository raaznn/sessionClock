var disp = document.getElementById("time-left");
var btnDisp = document.getElementById("start_stop");
var labelDisp = document.getElementById("timer-label");
var timeMin = 0;
var timeSec = 0;
var intervalId = null;
var timerRunning = false;
var isBreak = false;

const breakDecrement = () => {
  var elem = document.getElementById("break-length");
  var num = parseInt(elem.innerHTML, 10);
  if (num > 1) {
    elem.innerHTML = num - 1;
  }
};

const breakIncrement = () => {
  var elem = document.getElementById("break-length");
  var num = parseInt(elem.innerHTML, 10);
  if (num < 59) {
    elem.innerHTML = num + 1;
  }
};

const sessionDecrement = () => {
  var elem = document.getElementById("session-length");
  var num = parseInt(elem.innerHTML, 10);
  if (num > 1) {
    elem.innerHTML = num - 1;
  }
};

const sessionIncrement = () => {
  var elem = document.getElementById("session-length");
  var num = parseInt(elem.innerHTML, 10);
  if (num > 1) {
    elem.innerHTML = num + 1;
  }
};

function updateTime() {
  if (timeMin >= 0) {
    if (timeSec > 0) {
      timeSec = timeSec - 1;
    } else if (timeMin == 0) {
      beep();
      timeSec = 0;
      if (!isBreak) {
        timeMin = document.getElementById("break-length").innerHTML;
        labelDisp.innerHTML = "Break";
        isBreak = true;
        timerRunning = false;
      } else {
        timeMin = document.getElementById("session-length").innerHTML;
        labelDisp.innerHTML = "Session";
        isBreak = false;
        timerRunning = false;
      }
    } else {
      timeSec = 59;
      timeMin = timeMin - 1;
    }
  }
  disp.innerHTML =
    timeMin.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    }) +
    ":" +
    timeSec.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
}

function startStopTimer() {
  timeMin = timeMin
    ? timeMin
    : document.getElementById("session-length").innerHTML;

  if (timerRunning) {
    clearInterval(intervalId);
    timerRunning = false;
    btnDisp.innerHTML = "Resume";
  } else {
    intervalId = setInterval(() => {
      updateTime();
    }, 1000);
    timerRunning = true;
    btnDisp.innerHTML = "Pause";
  }
}

function resetTimer() {
  document.getElementById("time-left").innerHTML = "25:00";
  document.getElementById("session-length").innerHTML = 25;
  document.getElementById("break-length").innerHTML = 5;
  timeSec = 0;
  timeMin = 0;
  btnDisp.innerHTML = "Start";
  labelDisp.innerHTML = "Session";
  clearInterval(intervalId);
  timerRunning = false;
  var snd = document.getElementById("beep");
  snd.pause();
  snd.currentTime = 0;
}

function beep() {
  var snd = document.getElementById("beep");
  snd.play();
}
