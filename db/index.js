const sequelize = require("./connection");

class DB {
  constructor(sequelize) {
    this.sequelize = sequelize;
  }

  //find the employees
  viewAllEmployees() {
    return this.sequelize.promise().query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title,
            department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.
            last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id 
            LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee
            manager ON manager.id = employee.manager_id;`
    );
  }

  viewEmployeesByDept(departmentId) {
    return this.sequelize
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
        departmentId
      );
  }

  viewAllPossibleManagers(employeeId) {
    return this.connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
      );
  }

  createEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  removeEmployee(employeeId) {
    return this.connection
      .promise()
      .query("DELETE FROM employee WHERE id = ?", employeeId);
  }

  updateEmployeeRole(employeeId, roleId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        employeeId,
        roleId,
      ]);
  }

  updateEmployeeManager(employeeId, managerId) {
    return this.connection
      .promise()
      .query("UPDATE eployee SET manager_id = ? WHERE id = ?", [
        managerId,
        employeeId,
      ]);
  }

  viewEmployeesByDept(departmentId) {
    return this.sequelize
      .promise()
      .query(
        "SELECT department.id, department.name FROM department;",
        departmentId
      );
  }

  createRole(role) {
    return this.sequelize.promise().query("INSERT INTO role set ?", role);
  }

  removeRole(roldId) {
    return this.sequelize
      .promise()
      .query("DELETE FROM role WHERE id = ?", roldId);
  }

  viewDepartBudgets() {
    return this.sequelize
      .promise()
      .query(
        "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;"
      );
  }

  viewAllDeparts() {
    return this.sequelize
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }

  createDepart() {
    return this.sequelize
      .promise()
      .query("INSERT INTO department SET ?", department);
  }

  removeDepart(departmentId) {
    return this.sequelize
      .promise()
      .query("DELETE FROM department WHERE id = ?", departmentId);
  }

  viewAllRoles() {
    return this.sequelize
      .promise()
      .query("SELECT role.id, role.name FROM role;");
  }
}

module.exports = new DB();
