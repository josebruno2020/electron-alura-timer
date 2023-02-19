const moment = require("moment");
const { ipcRenderer } = require("electron");

let time;
let timer;
let seconds;

module.exports = {
  start(element) {
    time = moment.duration(element.textContent);
    seconds = time.asSeconds();
    clearInterval(timer);
    timer = setInterval(() => {
      seconds += 1;
      element.textContent = this.secondsToTime(seconds);
    }, 1000);
  },

  stop(element) {
    clearInterval(timer);
    element.textContent = this.secondsToTime(0);
  },

  secondsToTime(seconds) {
    return moment().startOf("day").seconds(seconds).format("HH:mm:ss");
  },

  pause({ curso }) {
    const timePass = this.secondsToTime(seconds);
    clearInterval(timer);
    ipcRenderer.send("pause", curso, timePass);
  },
};
