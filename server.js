const logo = require("asciiart-logo");
const colors = require("colors");
const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

const init = () => {
  const logoText = logo({
    name: "Employee Tracker",
    font: "ANSI Shadow",
  }).render();
  console.log(logoText.green);

  console.log("Welcome to the Employee Tracker!\n".yellow.bold);
  loadMainPrompts();
};

//main prompts

const loadMainPrompts = () => {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What do you want to do?".brightRed,
      choices: [
        {
          name: "View all employees",
          value: "view_all_employees",
        },
        {
          name: "View All employees by Department",
          value: "view_employees_by_dept",
        },
        {
          name: "Quit",
          value: "QUIt",
        },
      ],
    },
  ]).then((res) => {
    let userChoice = res.choice;

    switch (userChoice) {
      case "view_all_employees":
        viewAllEmployees();
        break;
      case "view_employees_by_dept":
        viewEmployeesByDept();
        break;
      default:
        quit();
    }
  });
};
