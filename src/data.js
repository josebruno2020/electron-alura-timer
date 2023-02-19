const jsonfile = require("jsonfile-promised");
const { existsSync, readdirSync } = require("fs");
const path = require("path");

let file;

module.exports = {
  save(curso, time) {
    file = path.resolve(__dirname, `../data/${curso}.json`);
    if (existsSync(file)) {
      this.addTimeInFile(file, time);
    } else {
      this.createFile(file).then(() => this.addTimeInFile(file, time));
    }
  },
  async createFile(file) {
    try {
      await jsonfile.writeFile(file, {});
      return console.log("arquivo criado com sucesso!");
    } catch (e) {
      return console.log(e);
    }
  },

  addTimeInFile(file, time) {
    const data = {
      ultimoTempo: new Date().toString(),
      tempo: time,
    };
    jsonfile
      .writeFile(file, data, {
        spaces: 2,
      })
      .then(() => console.log("Arquivo escrito com sucesso!"))
      .catch((e) => console.log(e));
  },

  getData(curso) {
    const pathFile = path.resolve(__dirname, `../data/${curso}.json`);
    return jsonfile.readFile(pathFile).catch((e) => {
      return {};
    });
  },

  getCourses() {
    const dir = path.resolve(__dirname, `../data`);
    const files = readdirSync(dir);

    return files.map((f) => f.replace(".json", ""));
  },
};
