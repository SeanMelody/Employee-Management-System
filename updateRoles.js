
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