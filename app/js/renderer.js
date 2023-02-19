const { ipcRenderer } = require("electron");
const timer = require("./timer");
const { getData } = require("../../src/data");

let linkSobre = document.querySelector("#link-sobre");
const time = document.querySelector(".tempo");
const curso = document.querySelector(".curso");
let isPlay = false;

window.onload = async () => {
  const dataTime = await getData(curso.textContent);
  time.textContent = dataTime.tempo;
};

linkSobre.addEventListener("click", function () {
  ipcRenderer.send("open-about");
});

const imgs = ["img/play-button.svg", "img/stop-button.svg"];
const playButton = document.querySelector(".botao-play");
playButton.addEventListener("click", () => {
  imgs.reverse();
  playButton.src = imgs[0];

  if (!isPlay) {
    timer.start(time);
    isPlay = true;
  } else {
    timer.pause({ curso: curso.textContent });
    isPlay = false;
  }
});

//evento -> mudar de curso atraves do tray menu
ipcRenderer.on("change-course", async (event, course) => {
  curso.textContent = course;
  const dataTime = await getData(course);
  time.textContent = dataTime?.tempo ?? "00:00:00";
});

const buttonPlus = document.querySelector(".botao-adicionar");
const input = document.querySelector(".campo-adicionar");
//adicionar curso
buttonPlus.addEventListener("click", () => {
  const newCourse = input.value;
  if (!newCourse.length) return;
  curso.textContent = newCourse;
  time.textContent = "00:00:00";

  input.value = "";

  //atualizar tray menu
  ipcRenderer.send("new-course", newCourse);
});
