// View function to ask what the user would like displayed
function departmentRoleEmployee() {
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
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        // View the results
        console.table(results)
        // Call the Start Function to go back to the main menu
        // start()
        viewDepartmentCosts()

    })
};

// View Department Function to show the different roles
function viewRoles() {
    // Connect to the database and ask the question
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        // View the results
        console.table(results)
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
