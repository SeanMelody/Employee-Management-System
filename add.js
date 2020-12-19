function add() {

    inquirer
        // Prompt to ask what the user would like to add
        .prompt({
            name: 'addDdeptRoleEmp',
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

function addDepartment() {
    inquirer
        .prompt({
            name: 'addDept',
            type: 'input',
            message: "What department would you like to add?: ",
        })

        .then((answer) => {
            // console.log(answer)
            console.log(answer.addDept)
            const query = connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.addDept,

                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} department inserted!\n`);

                }
            )
        })
};

function addRole() {
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

        .then((answer) => {
            console.log(answer)
            // console.log(answer.addTitle)
            // const query = connection.query(
            //     'INSERT INTO department SET ?',
            //     {
            //         name: answer.addRole,

            //     },
            //     (err, res) => {
            //         if (err) throw err;
            //         console.log(`${res.affectedRows} department inserted!\n`);

            //     }
            // )
        })
};

function addEmployee() {
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
        .then((answer) => {
            console.log(answer)
            // .then((answer) => {
            //         // Based on their answer, either call the ViewDepartments, ViewRoles, ViewEmployee, Functions, or go back to main menu!
            //         if (answer.deptRoleEmp === 'Departments') {
            //             // Call the View Departments Function
            //             viewDepartments()
            //         } else if (answer.deptRoleEmp === 'Roles') {
            //             // Call the View Roles Function
            //             viewRoles()
            //         } else if (answer.deptRoleEmp === 'Employees') {
            //             // Call the View Employees Function
            //             viewEmployees()
            //         } else {
            //             // Call the Start Function to go back to the main menu
            //             start()
            //         }
        });
};