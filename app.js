// Const to require mysql for the database
const mysql = require("mysql");
// Const to be able to use Inquirer to ask questions to the user
const inquirer = require("inquirer");
// Const Ctable as it is required for the homework to display the tables
// const cTable = require('console.table');

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
                // console.log("Add")
                add();
            } else if (answer.addViewUpdate === 'View') {
                view();
                // viewEmployees();
            } else if (answer.addViewUpdate === 'Update') {
                update()
            } else {
                console.log("Have a wonderful day!")
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
            message: 'Would you like to Add Departments, Roles or Employees?',
            choices: ['Departments', 'Roles', 'Employees', 'Main Menu'],
        })

        // Get the answer to the question
        .then((answer) => {
            // Based on their answer, either call the AddDepartments, AddRoles, AddEmployee, Functions, or go back to main menu!
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
                (err, res) => {
                    if (err) throw err;
                    // console.log(`${res.affectedRows} department inserted!\n`)

                    //Let the User Know that the department that has been inserted!
                    console.log(`${answer.addDept} Department Inserted \n`)
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};

//Add Role Function to add a line to the role table
function addRole() {
    // Prompt the questions
    inquirer
        .prompt([{
            name: 'addTitle',
            type: 'input',
            message: "What Title role would you like to add?: ",
        },
        {
            name: 'addSalary',
            type: 'input',
            message: "What Salary role would you like to add?: ",
        },
        {
            name: 'addDeptId',
            type: 'input',
            message: "What Department Id role would you like to add?: ",
        },
        ])
        // Get the answer to the questions
        .then((answer) => {
            // Connect to the database and insert the info!
            // console.log(answer)
            connection.query(
                'INSERT INTO role SET ?',
                [
                    {
                        title: answer.addTitle,
                        salary: answer.addSalary,
                        department_id: answer.addDeptId,

                    },
                ],
                (err, res) => {
                    if (err) throw err;
                    //Let the User Know that the department that has been inserted!
                    console.log(`${answer.addTitle} role inserted!\n`);
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
            message: "What Role Id role would you like to add?: ",
        },
        {
            name: 'addManagerId',
            type: 'input',
            message: "What Manager Id role would you like to add?: ",
        },
        ])
        // Get the answer to the questions
        .then((answer) => {
            // Connect to the database and insert the info!
            // console.log(`${answer.addFirst} ${answer.addLast} employee Inserted \n`)
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
                    console.log(`${answer.addFirst} ${answer.addLast} employee Inserted \n`)
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
    connection.query('SELECT name FROM department', (err, results) => {
        if (err) throw err;
        // View the results
        console.table(results)
        console.log("----------------------------- \n")
        // Call the Start Function to go back to the main menu
        start()
        // Function to view costs by department
        // viewDepartmentCosts()

    })
};

// View Department Function to show the different roles
function viewRoles() {
    // Connect to the database and ask the question
    connection.query('SELECT title, salary FROM role', (err, results) => {
        if (err) throw err;
        // View the results
        console.table(results)
        console.log("--------------------------------------------- \n")
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
        console.log("--------------------------------------------------------------------- \n")
        // Call the Start Function to go back to the main menu
        start()

    })
};

function viewDepartmentCosts() {
    inquirer
        // Prompt to ask what the user would like displayed
        .prompt({
            name: 'viewDeptCosts',
            type: 'list',
            message: 'Which department would you like to see the costs for',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Main Menu'],
        })

        // Get the answer to the question
        .then((answer) => {
            // Based on their answer, either call the Functions to get the information they want, or return to main menu!
            if (answer.viewDeptCosts === 'Engineering') {
                // Call the View Departments Function
                engineeringCosts()
            } else if (answer.viewDeptCosts === 'Finance') {
                // Call the View Roles Function
                financeCosts()
            } else if (answer.viewDeptCosts === 'Legal') {
                // Call the View Employees Function
                legalCosts()
            } else if (answer.viewDeptCosts === 'Sales') {
                // Call the View Employees Function
                salesCosts()
            } else {
                // Call the Start Function to go back to the main menu
                start()
            }
        });
};

// salary = 0;
function engineeringCosts() {
    connection.query('SELECT salary FROM role', (err, results) => {
        if (err) throw err;
        // View the results
        console.log(results[0])
        // for (let i = 0; i < results.length; i++) {
        //     salary = results[i]
        //     salary++
        //     console.log(salary)
        // }
        // console.log(salary)
        // for (let i = 0; i < results.length; i++) {
        //     const salaryTotal = array[i];

        // }
        // Call the Start Function to go back to the main menu
        start()
    })

}
function financeCosts() {
    console.log("Financing Costs")
}
function legalCosts() {
    console.log("Legal Costs")
}
function salesCosts() {
    console.log("Sales Costs")
}


//Update Function to update Employee's role
function update() {
    inquirer
        // Prompt to ask what employee the user would like to update
        .prompt([{
            name: 'updateRole',
            type: 'list',
            message: 'Which employee would you like to update?',
            choices: ["Matt", "Ashley", "Arya", "Ted"],
        },
        {
            name: 'newRole',
            type: 'list',
            message: 'What Role would you like them to have?',
            choices: ["Developer", "Accountant", "Database Admin", "Traveling Salesman"],
        }
        ])

        // Get the answer to the questions
        .then((answer) => {
            // console.log(answer)
            // Connect to the database and insert the info!
            connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                    {
                        role_id: answer.updateRole,
                    },
                    {
                        first_name: answer.newRole,
                    },

                ],
                (err, res) => {
                    if (err) throw err;
                    //Let the User Know that the employee role has been updated!
                    console.log(`${answer.updateRole} employee role updated \n`)
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};