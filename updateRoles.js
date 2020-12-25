// Update Function to find out what the user would like to Update
function update() {
    inquirer
        // Prompt to ask what the user would like displayed
        .prompt({
            name: 'empRoleOrManager',
            type: 'list',
            message: 'Would you like to update an Employees Role, or Employees Manager?',
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
            // choices: ["Developer", "Accountant", "Database Admin", "Traveling Salesman"],
        }
        ])
        // Get the answer to the questions
        .then((answer) => {
            console.log(answer)
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
                    console.log(`${answer.updateFirstNameRole} ${answer.updateLastNameRole}'s role updated \n`)
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};


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
            // choices: ["Developer", "Accountant", "Database Admin", "Traveling Salesman"],
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
                    console.log(`${answer.updateFirstNameMan} ${answer.updateLastNameMan} employee's Manager updated \n`)
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};