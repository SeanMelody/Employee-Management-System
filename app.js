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

// View function to ask what the user would like displayed
function departmentRoleEmployee() {
    inquirer
        // Prompt to ask what the user would like displayed
        .prompt({
            name: 'deptRoleEmp',
            type: 'list',
            message: 'Would you like to View Departments, Roles or Employees?',
            choices: ['Departments', 'Roles', 'Employees', 'Main Menu'],
        })

        // Get the answer to the question
        .then((answer) => {
            // Based on their answer, either call the ViewDepartments, ViewRoles, ViewEmployee, Functions, or go back to main menu!
            if (answer.deptRoleEmp === 'Departments') {
                // Call the View Departments Function
                viewDepartments()
            } else if (answer.deptRoleEmp === 'Roles') {
                // Call the View Roles Function
                viewRoles()
            } else if (answer.deptRoleEmp === 'Employees') {
                // Call the View Employees Function
                viewEmployees()
            } else {
                // Call the Start Function to go back to the main menu
                start()
            }
        });
};

// View Department Function to show the different departments
function viewDepartments() {
    // Connect to the database and ask the question
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        // View the results
        console.table(results)
        // Call the Start Function to go back to the main menu
        start()
    })
};

// View Department Function to show the different roles
function viewRoles() {
    // Connect to the database and ask the question
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        // View the results
        console.table(results)
        // Call the Start Function to go back to the main menu
        start()
    })
};

// View Department Function to show the different employees
function viewEmployees() {
    // Connect to the database and ask the question
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        // View the results
        console.table(results)
        // Call the Start Function to go back to the main menu
        start()

    })
};

