// Delete Function to see what the user would like to delete
function deleteQuestion() {
    inquirer
        // Prompt to ask what the user would like displayed
        .prompt({
            name: 'deleteDeptRoleEmp',
            type: 'list',
            message: 'Would you like to Delete a Department, Role, or Employee?',
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
                    console.log(`${answer.deleteDept} Department Deleted!\n`);
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
                    console.log(`${answer.deleteRole} Role Deleted!\n`);
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

            // *** TEST TO MAKE SURE THAT THE PERSON EXISTS IN THE DATABASE ***
            // connection.query(
            //     'SELECT first_name, last_name FROM employee',
            //     [
            //         {
            //             first_name: answer.deleteFirstName,
            //         },
            //         {
            //             last_name: answer.deleteLastName,
            //         },
            //     ],
            //     (err, res) => {
            //         if (err) throw err;

            //         console.log(`${answer.deleteFirstName} ${answer.deleteLastName} Employee Deleted!\n`)
            //         // Call the start function to go back to the main menu and restart the questions!
            //         start()
            //     }
            // )
            // *** END TEST ***

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
                    console.log(`${answer.deleteFirstName} ${answer.deleteLastName} Employee Deleted!\n`);
                    // Call the start function to go back to the main menu and restart the questions!
                    start()
                }
            )
        })
};