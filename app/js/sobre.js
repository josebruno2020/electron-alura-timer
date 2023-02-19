const { ipcRenderer, shell } = require("electron");
const process = require("process");

const electronVersion = document.querySelector("#electron");

window.onload = () => {
  electronVersion.textContent = process.versions.electron;
};

const linkClose = document.querySelector("#close");
linkClose.addEventListener("click", () => {
  ipcRenderer.send("about-close");
});

function openSite() {
  shell.openExternal("https://jbcamps.dev");
}
