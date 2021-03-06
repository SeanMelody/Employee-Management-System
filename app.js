// Const to require mysql for the database
const mysql = require("mysql");
// Const to be able to use Inquirer to ask questions to the user
const inquirer = require("inquirer");
// Const Ctable as it is required for the homework to display the tables
const cTable = require('console.table');
// Const Colors to color the text in the console. Yeay!
const colors = require('colors');
// Const clear to clear the console. Yeay!
const clear = require('clear');
// Const Figlet to print my super cool title in the console. Yeay!
const figlet = require('figlet');



// Connect to the Database!
const connection = mysql.createConnection({
    host: 'localhost',
    // Your port; if not 3306
    port: 3306,
    // my username
    user: 'root',
    // my super secret password
    password: 'password',
    database: 'employees_db',
});

//Connect and check for dem errors!
connection.connect((err) => {
    if (err) throw err;
    start();
});

//Welcome Sign to Display the title of the Application using Figlet
function welcome() {
    // Clear used to clear the console before the start of the program.
    clear()
    console.log("===============================".brightBlue)
    // Figlet used here! Font Calvin S
    console.log(figlet.textSync('Seans \nEmployee \nManagement \nSystem', {
        font: 'Calvin S',
        horizontalLayout: 'fitted',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true

    }));
    console.log("===============================".brightBlue)
}
// Call the Welcome Function to display the title of the application
welcome()


// Start the program!
function start() {
    // Prompt the first question
    inquirer
        // Options are Add, View, Update, Delete or Exit the Program
        .prompt({
            name: 'addViewUpdate',
            type: 'list',
            message: 'Would you like to Add, View, Update or Delete?'.brightRed,
            choices: ['Add', 'View', 'Update', 'Delete', 'Exit'],
        })
        // Get the answer to the question
        .then((answer) => {
            // based on their answer, either call the Add, View, Update, or Exit functions!
            if (answer.addViewUpdate === 'Add') {
                add();
            } else if (answer.addViewUpdate === 'View') {
                view();
            } else if (answer.addViewUpdate === 'Update') {
                update();
            } else if (answer.addViewUpdate === 'Delete') {
                deleteQuestion();
            } else {
                console.log("Have a wonderful day!".rainbow)
                connection.end();
                process.exit(0);
            }
        });
};

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

// View function to ask what the user would like displayed
function view() {
    inquirer
        // Prompt to ask what the user would like displayed
        .prompt({
            name: 'deptRoleEmp',
            type: 'list',
            message: 'What would you like to view?'.brightGreen,
            choices: ['Departments', 'Roles', 'Employees', 'Employees by Manager', 'Department Costs', 'Main Menu'],
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
            } else if (answer.deptRoleEmp === 'Employees by Manager') {
                // Call the View Employees by Manager Function
                viewEmployeesManager()
            } else if (answer.deptRoleEmp === 'Department Costs') {
                // Call the View Department Costs Function
                viewDepartmentCosts()
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
        console.log("\n")
        console.table(results)
        console.log("\n")
        // Call the Start Function to go back to the main menu
        start()

    })
};

//LEFT JOIN department ON role.department_id=department.id ORDER BY role.id
// View Roles Function to show the different roles
function viewRoles() {
    // Connect to the database and ask the question
    connection.query('SELECT * FROM role INNER JOIN department ON department.id=role.id', (err, results) => {
        if (err) throw err;
        // View the results
        console.log("\n")
        console.table(results)
        console.log("\n")
        // Call the Start Function to go back to the main menu
        start()

    })
};

// View employees function to see all the employees and their roles and departments
function viewEmployees() {
    // Connect to the database and ask the question
    connection.query('SELECT * FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON department.id=role.department_id', (err, results) => {
        if (err) throw err;
        // View the results
        console.log("\n")
        console.table(results)
        console.log("\n")
        // Call the Start Function to go back to the main menu
        start()

    })
};

// View Employees by Manager Function to show the different employees Managers
function viewEmployeesManager() {
    // Connect to the database and ask the question

    //Thank you to Mike S from Stack overflow who answered a similar question in 2012
    connection.query('SELECT e.first_name AS Employee, m.first_name AS Manager FROM employee e INNER JOIN employee m ON m.id=e.manager_id ORDER BY e.id', (err, results) => {
        if (err) throw err;
        // View the results
        console.log("\n")
        console.table(results)
        console.log("\n")
        // Call the Start Function to go back to the main menu
        start()

    })
}

// View Department Costs function to see the total salaries for each department!
function viewDepartmentCosts() {
    inquirer
        // Prompt to ask what the user would like displayed
        .prompt({
            name: 'viewDeptCosts',
            type: 'input',
            message: 'Which department would you like to see the costs for? ',
        })

        // Connect to the database and ask the question
        .then((answer) => {
            connection.query('SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON department.id=role.department_id WHERE ?',
                {
                    name: answer.viewDeptCosts

                },
                // Catch all them pesky Errors!
                (err, results) => {
                    if (err) throw err;
                    // console.table(results)

                    // Set Pay to 0
                    let pay = 0
                    // Map over the results
                    results.map((item) => {
                        // Increase the pay for each salary in the department
                        pay += item.salary
                    })
                    // let the user know the total cost of the department they searched
                    console.log(`Salary total for the ${answer.viewDeptCosts} Department is ${pay} \n`.brightYellow)

                    // Call the Start Function to go back to the main menu
                    start()
                })
        });
};

// Update Function to find out what the user would like to Update
function update() {
    inquirer
        // Prompt to ask what the user would like to update
        .prompt({
            name: 'empRoleOrManager',
            type: 'list',
            message: 'Would you like to update an Employees Role, or Employees Manager?'.brightGreen,
            choices: ['Employees Role', 'Employees Manager', 'Main Menu'],
        })

        // Get the answer to the question
        .then((answer) => {
            // Based on their answer, either call the update Employee Role, update Employee Manager or go back to main menu!
            if (answer.empRoleOrManager === 'Employees Role') {
                // Call the View Departments Function
                updateEmpRole()
            } else if (answer.empRoleOrManager === 'Employees Manager') {
                // Call the View Roles Function
                updateEmpManager()
            } else {
                // Call the Start Function to go back to the main menu
                start()
            }
        });
};

//Update Function to update Employee's role
function updateEmpRole() {
    inquirer
        // Prompt to ask what employee the user would like to update
        .prompt([{
            name: 'updateFirstNameRole',
            type: 'input',
            message: 'What is the employee you would like to updates first name?',
        },
        {
            name: 'updateLastNameRole',
            type: 'input',
            message: 'What is the employee you would like to updates first last?',
        },
        {
            name: 'newRole',
            type: 'input',
            message: 'What Role would you like them to have?',
        }
        ])
        // Get the answer to the questions
        .then((answer) => {

            // Connect to the database and insert the info!
            connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                    {
                        role_id: answer.newRole,
                    },
                    {
                        first_name: answer.updateFirstNameRole
                    },
                    {
                        last_name: answer.updateLastNameRole,
                    },

                ],
                (err, res) => {
                    if (err) throw err;
                    //Let the User Know that the employee role has been updated!
                    console.log(`${answer.updateFirstNameRole} ${answer.updateLastNameRole}'s role updated \n`.brightYellow)
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};

// Update Employee Manger to update the requested Employee's Manager
function updateEmpManager() {
    inquirer
        // Prompt to ask what employee the user would like to update
        .prompt([{
            name: 'updateFirstNameMan',
            type: 'input',
            message: 'What is the employee you would like to updates first name?',
        },
        {
            name: 'updateLastNameMan',
            type: 'input',
            message: 'What is the employee you would like to updates first last?',
        },
        {
            name: 'newManager',
            type: 'input',
            message: 'What Manager ID would you like them to have?',
        }
        ])

        // Get the answer to the questions
        .then((answer) => {
            // Connect to the database and insert the info!
            connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                    {
                        manager_id: answer.newManager,
                    },
                    {
                        first_name: answer.updateFirstNameMan,
                    },
                    {
                        last_name: answer.updateLastNameMan,
                    },

                ],
                (err, res) => {
                    if (err) throw err;
                    //Let the User Know that the employee role has been updated!
                    console.log(`${answer.updateFirstNameMan} ${answer.updateLastNameMan} employee's Manager updated \n`.brightYellow)
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};

// Delete Function to see what the user would like to delete
function deleteQuestion() {
    inquirer
        // Prompt to ask what the user would like displayed
        .prompt({
            name: 'deleteDeptRoleEmp',
            type: 'list',
            message: 'Would you like to Delete a Department, Role, or Employee?'.brightGreen,
            choices: ['Departments', 'Roles', 'Employees', 'Main Menu'],
        })

        // Get the answer to the question
        .then((answer) => {
            // Based on their answer, either call the deleteDepartments, deleteRoles, deleteEmployee Functions, or go back to main menu!
            if (answer.deleteDeptRoleEmp === 'Departments') {
                // Call the delete Departments Function
                deleteDepartments()
            } else if (answer.deleteDeptRoleEmp === 'Roles') {
                // Call the delete Roles Function
                deleteRoles()
            } else if (answer.deleteDeptRoleEmp === 'Employees') {
                // Call the delete Employees Function
                deleteEmployees()
            } else {
                // Call the Start Function to go back to the main menu
                start()
            }
        });
};

// Delete Department Function to be able to delete Departments
function deleteDepartments() {
    // Prompt the questions
    inquirer
        .prompt({
            name: 'deleteDept',
            type: 'input',
            message: "What Department would you like to delete?: ",
        })
        // Get the answer to the questions
        .then((answer) => {
            // Connect to the database and delete the info!
            connection.query(
                'DELETE FROM department WHERE ?',
                [
                    {
                        name: answer.deleteDept
                    },
                ],
                (err, res) => {
                    if (err) throw err;
                    //Let the User Know that the department that has been deleted!
                    console.log(`${answer.deleteDept} Department Deleted!\n`.brightYellow);
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};

// Delete Roles Function to be able to delete Roles
function deleteRoles() {
    // Prompt the questions
    inquirer
        .prompt({
            name: 'deleteRole',
            type: 'input',
            message: "What Role would you like to delete?: ",
        })
        // Get the answer to the questions
        .then((answer) => {
            // Connect to the database and delete the info!
            connection.query(
                'DELETE FROM role WHERE ?',
                [
                    {
                        title: answer.deleteRole
                    },
                ],
                (err, res) => {
                    if (err) throw err;
                    //Let the User Know that the Role that has been deleted!
                    console.log(`${answer.deleteRole} Role Deleted!\n`.brightYellow);
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};

// Delete Employees Function to be able to delete Employees
function deleteEmployees() {
    // Prompt the questions
    inquirer
        .prompt([{
            name: 'deleteFirstName',
            type: 'input',
            message: "What is the Employee's First Name you would like to delete?: ",
        },
        {
            name: 'deleteLastName',
            type: 'input',
            message: "What is the Employee's Last Name you would like to delete?: ",
        }])
        // Get the answer to the questions
        .then((answer) => {
            // Connect to the database and delete the info!
            connection.query(
                'DELETE FROM employee WHERE ?',
                [
                    {
                        first_name: answer.deleteFirstName,
                    },
                    {
                        last_name: answer.deleteLastName,
                    },
                ],
                (err, res) => {
                    if (err) throw err;
                    //Let the User Know that the employee has been deleted!
                    console.log(`${answer.deleteFirstName} ${answer.deleteLastName} Employee Deleted!\n`.brightYellow);
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};