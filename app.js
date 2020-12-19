const mysql = require("mysql");
const inquirer = require("inquirer");

// Connect to the Database!
const connection = mysql.createConnection({
    host: 'localhost',
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: 'root',
    // Your password
    password: 'password',
    database: 'employees_db',
});

connection.connect((err) => {
    if (err) throw err;
    start();
});

// Start the program!
function start() {
    // Prompt the first question
    inquirer
        // Options are Add, View, Update or Exit the Program
        .prompt({
            name: 'addViewUpdate',
            type: 'list',
            message: 'Would you like to Add, View or Update Employee Roles?',
            choices: ['Add', 'View', 'Update', 'Exit'],
        })
        // Get the answer to the question
        .then((answer) => {
            // based on their answer, either call the Add, View, Update, or Exit functions!
            if (answer.addViewUpdate === 'Add') {
                console.log("Add")
            } else if (answer.addViewUpdate === 'View') {
                departmentRoleEmployee();
                // viewEmployees();
            } else if (answer.addViewUpdate === 'Update') {
                console.log("Update")
            } else {
                console.log("Bye!")
                connection.end();
                process.exit(0);
            }
        });
};


function departmentRoleEmployee() {
    inquirer
        .prompt({
            name: 'deptRoleEmp',
            type: 'list',
            message: 'Would you like to View Departments, Roles or Employees?',
            choices: ['Departments', 'Roles', 'Employees', 'Main Menu'],
        })

        // Get the answer to the question
        .then((answer) => {
            // based on their answer, either call the Add, View, Update, or Exit functions!
            if (answer.deptRoleEmp === 'Departments') {
                console.log("Departments")
            } else if (answer.deptRoleEmp === 'Roles') {
                console.log("Roles")
                // viewEmployees();
            } else if (answer.deptRoleEmp === 'Employees') {
                console.log("Employees")
            } else {
                start()
            }
        });
};


function viewDepartments() {
    // console.log("View Departments")
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results)
    })
};

function viewEmployees() {
    console.log("View Employees")
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results)
    })
};

function viewDepartments() {
    console.log("View Departments")
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results)
    })
};

function viewRoles() {
    console.log("View Roles")
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        console.table(results)
    })
};