// const logo = require("asciiart-logo");
// const colors = require("colors");
const { prompt } = require("inquirer");
const { viewAllRoles } = require("./db");
const db = require("./db");
require("console.table");

const init = () => {
  //   const logoText = logo({
  //     name: "Employee Tracker",
  //     font: "ANSI Shadow",
  //   }).render();
  //   console.log(logoText.green);

  //   console.log("Welcome to the Employee Tracker!\n".yellow.bold);
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
        {
          name: "Create Role",
          value: "createRole",
        },
        {
          name: "Remove Role",
          value: "removeRole",
        },
        {
          name: "View Department Budgets",
          value: "view_dept_budgets",
        },
        {
          name: "View all Departments",
          value: "view_all_departs",
        },
        {
          name: "Create Department",
          value: "create_depart",
        },
        {
          name: "Remove Department",
          value: "remove_depart",
        },
        {
          name: "View Employees by Manager",
          value: "view_employees_by_manager",
        },
        {
          name: "Remove Employee",
          value: "remove_employee",
        },
        {
          name: "Update Employee Role",
          value: "update_employee_role",
        },
        {
          name: "Update Employee Manager",
          value: "update_employee_manager",
        },
        {
          name: "View Roles",
          value: "view_roles",
        },
        {
          name: "Create Employee",
          value: "create_employee",
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
      case "createRole":
        createRole();
        break;
      case "removeRole":
        removeRole();
        break;
      case "view_dept_budgets":
        viewDepartBudgets();
        break;
      case "view_all_departs":
        viewAllDeparts();
        break;
      case "create_depart":
        createDepart();
        break;
      case "remove_depart":
        removeDepart();
        break;
      case "view_employees_by_manager":
        viewEmployeesByManagers();
        break;
      case "remove_employee":
        removeEmployee();
        break;
      case "update_employee_role":
        updateEmployeeRole();
        break;
      case "update_employee_manager":
        updateEmployeeManager();
        break;
      case "view_roles":
        viewAllRoles();
        break;
      case "create_employee":
        createEmployee();
        break;

      default:
        quit();
    }
  });
};
init();

function viewAllEmployees() {
  db.viewAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function viewEmployeesByDept() {
  db.viewAllDeparts().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to se employees for?",
        choices: departmentChoices,
      },
    ])
      .then((res) => db.viewEmployeesByDept(res.department))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => loadMainPrompts());
  });
}

function viewEmployeesByManagers() {
  db.viewAllEmployees().then(([rows]) => {
    let managers = rows;
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which employee do you want to see direct reports for?",
        choices: managerChoices,
      },
    ])
      .then((res) => db.viewEmployeesByManagers(res.managerId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        if (employees.length === 0) {
          console.log("the selected employee has no direct reports");
        } else {
          console.table(employees);
        }
      })
      .then(() => loadMainPrompts());
  });
}

function removeEmployee() {
  db.viewAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove",
        choices: employeeChoices,
      },
    ])
      .then((res) => db.removeEmployee(res.employeId))
      .then(() => console.log("Removed employee from the database"))
      .then(() => loadMainPrompts());
  });
}

function updateEmployeeRole() {
  db.viewAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee role do want to update?",
        choices: employeeChoices,
      },
    ])
      .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
      .then(() => console.log("Updated employee role in database"))
      .then(() => loadMainPrompts());
  });
}

function updateEmployeeManager() {
  db.viewAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's manager do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeId;
      db.viewAllPossibleManagers(employeeId).then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(
          ({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          })
        );

        prompt([
          {
            type: "list",
            name: "managerId",
            message:
              "Which employee do you want to set as manager for the selected employee?",
            choices: managerChoices,
          },
        ])
          .then((res) => db.updateEmployeeManager(employeeId, res.managerId))
          .then(() => console.log("Updated employee's manager"))
          .then(() => loadMainPrompts());
      });
    });
  });
}

function viewAllRoles() {
  db.viewAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => loadMainPrompts);
}

function addRole() {
  db.viewAllDeparts().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        name: "title",
        message: "what is the name of the role?",
      },
      {
        name: "salary",
        message: "what is the salary of the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "which department does the role belong to?",
        choices: departmentChoices,
      },
    ]).then((role) => {
      db.createRole(role)
        .then(() => console.log(`Added ${role.title} to database`))
        .then(() => loadMainPrompts());
    });
  });
}

function removeRole() {
  db.viewAllRoles().then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "roleId",
        message:
          "which role do you want to remove(Warning: this will also remove employees)",
        choices: roleChoices,
      },
    ])
      .then((res) => db.removeRole(res.roleId))
      .then(() => console.log("Removed role from the database"))
      .then(() => loadMainPrompts());
  });
}

function viewAllDeparts() {
  db.viewAllDeparts()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadMainPrompts());
}

function createDepart() {
  prompt([
    {
      name: "name",
      message: "what is the name of the department?",
    },
  ]).then((res) => {
    let name = res;
    db.createDepart(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => loadMainPrompts());
  });
}

function removeDepart() {
  db.viewAllDeparts().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt({
      type: "list",
      name: "departmentId",
      message:
        "Which department would you like to remove? (warning: This will also remove all the associated roles and employees and managers)",
      choices: departmentChoices,
    })
      .then((res) => db.removeDepart(res.departmentId))
      .then(() => console.log(`Removed department from the database`))
      .then(() => loadMainPrompts());
  });
}

function createEmployee() {
  prompt([
    {
      name: "first_name",
      message: "what is your first name?",
    },
    {
      name: "last_name",
      message: "what is your employee's last name?",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.viewAllRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      prompt({
        type: "list",
        name: "roleId",
        message: "what is the employee's role?",
        choices: roleChoices,
      }).then((res) => {
        let roleId = res.roleId;

        db.viewAllEmployees().then(([rows]) => {
          let employees = rows;
          const managerChoices = employees.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            })
          );

          managerChoices.unshift({ name: "None", value: null });

          prompt({
            type: "list",
            name: "managerId",
            message: "who is the employee's manager?",
            choices: managerChoices,
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName,
              };

              db.createEmployee(employee);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to the database`)
            )
            .then(() => loadMainPrompts());
        });
      });
    });
  });
}

function quit() {
  console.log("\n");
}
