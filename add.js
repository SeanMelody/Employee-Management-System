// Const to require mysql for the database
const mysql = require("mysql");
// Const to be able to use Inquirer to ask questions to the user
const inquirer = require("inquirer");
// Const Ctable as it is required for the homework to display the tables
const cTable = require('console.table');
// Const Colors to color the text in the console. Yeay!
const colors = require('colors');

// Add function to see if the user would like to add A Dept, Role, or Employee!
function add() {
    inquirer
        // Prompt to ask what the user would like to add
        .prompt({
            name: 'addDeptRoleEmp',
            type: 'list',
            message: 'Would you like to Add Departments, Roles or Employees?'.brightGreen,
            choices: ['Departments', 'Roles', 'Employees', 'Main Menu'],
        })

        // Get the answer to the question
        .then((answer) => {
            // Based on their answer, either call the AddDepartments, AddRoles, AddEmployee Functions, or go back to main menu!
            if (answer.addDeptRoleEmp === 'Departments') {
                // Call the Add Departments Function
                addDepartment()
            } else if (answer.addDeptRoleEmp === 'Roles') {
                // Call the Add Roles Function
                addRole()
            } else if (answer.addDeptRoleEmp === 'Employees') {
                // Call the Add Employees Function
                addEmployee()
            } else {
                // Call the Start Function to go back to the main menu
                start()
            }
        });
};

//Add Department Function to add a line to the department table
function addDepartment() {
    // Prompt the question
    inquirer
        .prompt({
            name: 'addDept',
            type: 'input',
            message: "What department would you like to add?: ",
        })

        //Get the answer!
        .then((answer) => {
            // Connect to the database and insert the info!
            const query = connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.addDept,

                },
                // Catch those pesky errors
                (err, res) => {
                    if (err) throw err;
                    // Let the User Know that the department that has been inserted!
                    console.log(`${answer.addDept} Department Inserted \n`.yellow)
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};

// Add Role Function to add a line to the role table
function addRole() {
    // Prompt the questions
    inquirer
        .prompt([{
            name: 'addTitle',
            type: 'input',
            message: "What is the name of new Role?: ",
        },
        {
            name: 'addSalary',
            type: 'input',
            message: "What is the salary for the new Role?: ",
        },
        {
            name: 'addDeptId',
            type: 'input',
            message: "What department ID is this role under?: ",
        },
        ])
        // Get the answer to the questions
        .then((answer) => {
            // Connect to the database and insert the info!
            connection.query(
                'INSERT INTO role SET ?',
                [
                    {
                        title: answer.addTitle,
                        salary: answer.addSalary,
                        department_id: answer.addDeptId,

                    },
                ],
                // Catching errors!
                (err, res) => {
                    if (err) throw err;
                    //Let the User Know that the department that has been inserted!
                    console.log(`${answer.addTitle} role inserted!\n`.yellow);
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};

//Add Employee Function to add a line to the Employee table
function addEmployee() {
    // Prompt the questions
    inquirer
        .prompt([{
            name: 'addFirst',
            type: 'input',
            message: "What is the Employee's First Name?: ",
        },
        {
            name: 'addLast',
            type: 'input',
            message: "What is the Employee's Last Name?: ",
        },
        {
            name: 'addRoleId',
            type: 'input',
            message: "What Role Id role would you like to add to the employee?: ",
        },
        {
            name: 'addManagerId',
            type: 'input',
            message: "What Manager Id would you like to add to the employee?: ",
        },
        ])
        // Get the answer to the questions
        .then((answer) => {
            // Connect to the database and insert the info!
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.addFirst,
                    last_name: answer.addLast,
                    role_id: answer.addRoleId,
                    manager_id: answer.addManagerId,

                },

                (err, res) => {
                    if (err) throw err;
                    //Let the User Know that the employee has been inserted!
                    console.log(`${answer.addFirst} ${answer.addLast} employee Inserted \n`.yellow)
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};

// export so we can use all this data
module.exports = add;