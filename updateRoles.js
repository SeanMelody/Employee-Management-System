//Update Function to update Employee's role
function update() {
    inquirer
        // Prompt to ask what employee the user would like to update
        .prompt([{
            name: 'updateFirstName',
            type: 'input',
            message: 'What is the employee you would like to updates first name?',
        },
        {
            name: 'updateLastName',
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
                        first_name: answer.updateFirstName
                    },
                    {
                        last_name: answer.updateLastName,
                    },

                ],
                (err, res) => {
                    if (err) throw err;
                    //Let the User Know that the employee role has been updated!
                    console.log(`${answer.updateFirstName} ${answer.updateLastName}'s role updated \n`)
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};


function updateManager() {
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
                    console.log(`${answer.newManager} employee role updated \n`)
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};