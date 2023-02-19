const { Menu } = require("electron");
const { getCourses } = require("./data");

module.exports = {
  trayTemplate(window) {
    const courses = getCourses();
    const menuItems = [
      {
        label: "Cursos",
      },
      {
        type: "separator",
      },
    ];

    courses.forEach((course) => {
      menuItems.push({
        label: course,
        type: "radio",
        click: () => window.send("change-course", course),
      });
    });

    return Menu.buildFromTemplate(menuItems);
  },
};
