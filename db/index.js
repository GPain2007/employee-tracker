const { sequelize } = require("./connection");
const { connection } = require("./connection");

class DB {
  constructor(sequelize) {
    this.sequelize = sequelize;
  }

  //find the employees
  viewAllEmployees() {
    return sequelize
      .query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title,
        department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.
            last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id 
            LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee
            manager ON manager.id = employee.manager_id;`
      )
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  viewEmployeesByDept(departmentId) {
    return sequelize

      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
        departmentId
      )
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  viewAllPossibleManagers(employeeId) {
    return sequelize

      .query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
      )
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  createEmployee(employee) {
    return sequelize
      .query(
        `INSERT INTO employee(id, first_name, last_name, role_id, manager_id)VALUES('${employee.id}','${employee.first_name}', '${employee.last_name}', '${employee.role_id}','${employee.manager_id}')`,
        employee
      )
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  removeEmployee(employeeId) {
    return sequelize

      .query(`DELETE FROM employee WHERE id = ${employee.id}`, employeeId)
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  updateEmployeeRole(employeeId, roleId) {
    return sequelize

      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        employeeId,
        roleId,
      ])
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  updateEmployeeManager(employeeId, managerId) {
    return sequelize

      .query("UPDATE employee SET manager_id = ? WHERE id = ?", [
        managerId,
        employeeId,
      ])
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  viewEmployeesByDept(departmentId) {
    return sequelize

      .query(
        "SELECT department.id, department.name FROM department;",
        departmentId
      )
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  createRole(role) {
    console.log(role);
    return sequelize
      .query(
        `INSERT INTO role( role.title, role.salary, role.department_id) VALUES( '${role.title}', ${role.salary}, '${role.department_id}'); `
        //role
      )
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  removeRole(roldId) {
    return sequelize

      .query(`DELETE FROM role WHERE id = '${roldId}'`)
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  viewDepartBudgets() {
    return sequelize
      .query(
        "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;"
      )
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  viewAllDeparts() {
    return sequelize

      .query("SELECT department.name FROM department;")
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  createDepart(department) {
    return sequelize

      .query(
        `INSERT INTO department(department.name) VALUES('${department.name}')`
      )
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  removeDepart(departmentId) {
    return sequelize

      .query(`DELETE FROM department WHERE id = ${departmentId}`)
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }

  viewAllRoles() {
    return sequelize

      .query("SELECT role.id, role.title FROM role;")
      .then((data) => {
        let row = [];
        data.forEach((element) => {
          row.push(element[0]);
        });

        return row;
      });
  }
}

module.exports = new DB();
