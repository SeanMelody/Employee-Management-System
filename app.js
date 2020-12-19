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

function start() {
    inquirer
        .prompt({
            name: 'addViewUpdate',
            type: 'list',
            message: 'Would you like to Add, View or Update Employee Roles?',
            choices: ['Add', 'View', 'Update', 'Exit'],
        })
        .then((answer) => {
            // based on their answer, either call the bid or the post functions
            if (answer.addViewUpdate === 'Add') {
                console.log("Add")
            } else if (answer.addViewUpdate === 'View') {
                viewEmployees();
            } else if (answer.addViewUpdate === 'Update') {
                console.log("Update")
            } else {
                console.log("Bye!")
                connection.end();
                process.exit(0);
            }
        });
};

function viewEmployees() {
    console.log("View Employees")
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results)
    })
};
