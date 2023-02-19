const { Menu } = require("electron");
const { getCourses } = require("./data");

let menuItems = [];

module.exports = {
  trayTemplate(window) {
    const courses = getCourses();
    menuItems = [
      {
        label: "Cursos",
      },
      {
        type: "separator",
      },
    ];

    console.log(courses);

    courses.forEach((course) =>
      this.addCourse({
        newCourse: course,
        window,
        isChecked: false,
      })
    );

    return Menu.buildFromTemplate(menuItems);
  },

  addCourse({ newCourse, window, isChecked }) {
    menuItems.push({
      label: newCourse,
      type: "radio",
      checked: isChecked,
      click: () => window.send("change-course", newCourse),
    });

    return Menu.buildFromTemplate(menuItems);
  },
};
