require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  user: "root",
  password: process.env.MYSQL_PASSWORD,

  // Your port; if not 3306
  port: 3306,

  // Your username

  // Your password

  database: "trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  questions();
});

function questions() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would like to do?",
      choices: [
        "View all employees",
        "View department",
        "View roles",
        "Add department",
        "Add employees",
        "Add roles",
        "Update employee roles",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          viewEmployees();
          break;

        case "View department":
          viewDepartment();
          break;

        case "View roles":
          viewRole();
          break;

        case "Add department":
          addDepartment();
          break;

        case "Add employees":
          addEmployee();
          break;

        case "Add roles":
          addRoles();
          break;

        case "Update employee roles":
          updateEmpRoles();
          break;
      }
    });
}

function viewEmployees() {
  connection.query(
    "SELECT department.name, role.title, role.salary, role.department_id, employee.first_name, employee.last_name, employee.role_id FROM employee INNER JOIN department ON department.id = employee.id INNER JOIN role ON role.id = employee.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      questions();
    }
  );
}

function viewDepartment() {
  connection.query(
    "SELECT department.name, employee.first_name, employee.last_name, employee.role_id FROM employee INNER JOIN department ON department.id = employee.id INNER JOIN role ON role.id = employee.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      questions();
    }
  );
}

function viewRole() {
  connection.query(
    "SELECT role.title, role.salary, role.department_id, employee.first_name, employee.last_name, employee.role_id FROM employee INNER JOIN department ON department.id = employee.id INNER JOIN role ON role.id = employee.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      questions();
    }
  );
}

//Add Departmetn
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the department name?",
      },
    ])
    .then(function (answer) {
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          //name: is from the database and answer.name related to the inquirer prompt
          name: answer.name,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          questions();
        }
      );
    });
}

//Add Roles
function addRoles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What will be the title of the employee?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the employee?",
      },
      {
        type: "input",
        name: "deptID",
        message: "What is the department ID of the employee?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          //title: is from database and answer.title is related to the inquirer prompt
          //all proceeding code follows as above
          title: answer.title,
          salary: answer.salary,
          department_id: answer.deptID,
        },

        function (err, res) {
          if (err) throw err;
          console.table(res);
          questions();
        }
      );
    });
}

//Add Employees
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the employee?",
      },
      {
        type: "input",
        name: "roleID",
        message: "What is the role ID of the employee?",
      },
      {
        type: "input",
        name: "managerID",
        message: "What is the manager ID of the employee?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleID,
          manager_id: answer.managerID,
        },

        function (err, res) {
          if (err) throw err;
          console.table(res);
          questions();
        }
      );
    });
}
function updateEmpRoles() {
  connection.query(
    "SELECT role.title, employee.last_name, employee.role_id, employee.id FROM employee INNER JOIN department ON department.id = employee.id INNER JOIN role ON role.id = employee.id",

    async function (err, res) {
      const employeesChoices = res.map(({ id, last_name }) => ({
        name: last_name,
        value: id,
      }));

      const { employeeId } = await 
      inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to update?",
          choices: employeesChoices,
        },
      ]);

      const rolesChoices = res.map(({ role_id, title }) => ({
        name: title,
        value: role_id,
      }));

      const { roleId } = await 
      inquirer
      .prompt([
        {
          type: "list",
          name: "roleId",
          message: "Which role do you want to assign to the employee?",
          choices: rolesChoices,
        },
      ]);

      await connection.query(
        "UPDATE employee SET role_id = ? WHERE id =?",

        [roleId, employeeId],

        function (err, res) {
          if (err) throw err;
          questions();
          console.log(res);
          //connection.end();
        }
      );
    }
  );
}
