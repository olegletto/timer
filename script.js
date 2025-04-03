const timerDiv = document.getElementById('timer');
const timerButton = document.getElementById('timerButton');

let startTime = localStorage.getItem("timerStart") ? Number(localStorage.getItem("timerStart")) : null;
let interval = null;

function updateTimer() {
    if (startTime) {
      const elapsedTime = Date.now() - startTime;
      const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((elapsedTime / 1000 / 60) % 60)).padStart(2, "0");
      const seconds = String(Math.floor((elapsedTime / 1000) % 60)).padStart(2, "0");
      const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, "0");
      timerDiv.innerText = `${minutes}:${seconds}:${milliseconds}`;
    } else {
      timerDiv.innerText = "00:00:00";
    }
  }

  function toggleTimer() {
    if (startTime) {
      localStorage.removeItem("timerStart");
      clearInterval(interval);
      startTime = null;
      timerButton.innerText = "Start Timer";
    } else {
      startTime = Date.now();
      localStorage.setItem("timerStart", startTime);
      interval = setInterval(updateTimer, 10);
      timerButton.innerText = "Stop Timer";
    }
  }

  if (startTime) {
    interval = setInterval(updateTimer, 10);
    timerButton.innerText = "Stop Timer";
  } else {
    timerButton.innerText = "Start Timer";
  }
  updateTimer();

  window.addEventListener("storage", (event) => {
    if (event.key === "timerStart") {
      startTime = event.newValue ? Number(event.newValue) : null;
      if (!startTime) {
        clearInterval(interval);
        timerButton.innerText = "Start Timer";
      } else {
        interval = setInterval(updateTimer, 10);
        timerButton.innerText = "Stop Timer";
      }
    }
  });

  timerButton.addEventListener("click", toggleTimer);
