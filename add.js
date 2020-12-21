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

