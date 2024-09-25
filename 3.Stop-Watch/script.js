let hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0;
let interval = null;
let startButton = document.getElementById("start");
let lapContainer = document.getElementById("lap-container");
let lapLists = document.getElementById("lap-lists");
let setLap = document.getElementById("set-lap");
let laps = [];
let hDisplay;
let mDisplay;
let sDisplay;
let msDisplay;

function startStopWatch() {
  if (!interval) {
    interval = setInterval(updateTime, 10);
    lapContainer.style.display = "block";
  }
}

function updateTime() {
  milliseconds += 10;

  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  hDisplay = hours < 10 ? "0" + hours : hours;
  mDisplay = minutes < 10 ? "0" + minutes : minutes;
  sDisplay = seconds < 10 ? "0" + seconds : seconds;
  msDisplay = milliseconds < 100 ? "0" + milliseconds / 10 : milliseconds / 10;

  document.getElementById(
    "watch-interface"
  ).innerText = `${hDisplay}:${mDisplay}:${sDisplay}:${msDisplay}`;
}
function stopStopWatch() {
  clearInterval(interval);
  interval = null;
}
function resetStopWatch() {
  stopStopWatch();
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  document.getElementById("watch-interface").innerText = "00:00:00:00";
  startButton.removeAttribute("disabled");
  startButton.innerText = "Start";
  lapContainer.style.display = "none";
}

startButton.addEventListener("click", () => {
  startStopWatch();
  startButton.setAttribute("disabled", "true");
  setLap.removeAttribute("disabled");
});

document.getElementById("stop").addEventListener("click", () => {
  stopStopWatch();
  startButton.removeAttribute("disabled");
  startButton.innerText = "Resume";
  setLap.setAttribute("disabled", "true");
});

document.getElementById("reset").addEventListener("click", () => {
  resetStopWatch();
  setLap.removeAttribute("disabled");
  lapLists.innerHTML = "";
  laps = [];
});

setLap.addEventListener("click", () => {
  laps.push(`${hDisplay}:${mDisplay}:${sDisplay}:${msDisplay}`);

  lapLists.innerHTML = "";

  laps.forEach((lap, i) => {
    let li = document.createElement("li");
    li.innerText = `Lap ${i + 1}: ${lap}`;
    lapLists.appendChild(li);
  });
});
