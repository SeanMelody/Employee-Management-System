// View function to ask what the user would like displayed
function view() {
    inquirer
        // Prompt to ask what the user would like displayed
        .prompt({
            name: 'deptRoleEmp',
            type: 'list',
            message: 'What would you like to view?',
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
    connection.query('SELECT name FROM department', (err, results) => {
        if (err) throw err;
        // View the results
        console.table(results)
        console.log("\n")
        // Call the Start Function to go back to the main menu
        start()

    })
};

// View Department Function to show the different roles
function viewRoles() {
    // Connect to the database and ask the question
    connection.query('SELECT * FROM role RIGHT JOIN department ON department.id=role.department_id', (err, results) => {
        if (err) throw err;
        // View the results
        console.table(results)
        console.log("\n")
        // Call the Start Function to go back to the main menu
        start()

    })
};

// View Department Function to show the different employees
function viewEmployees() {
    // Connect to the database and ask the question
    connection.query('SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON department.id=role.department_id', (err, results) => {
        if (err) throw err;
        // View the results
        console.table(results)
        console.log("\n")
        // Call the Start Function to go back to the main menu
        start()

    })
};

function viewEmployeesManager() {
    // Connect to the database and ask the question
    connection.query('SELECT manager_id, first_name, last_name FROM employee', (err, results) => {
        if (err) throw err;
        // View the results
        console.table(results)
        console.log("\n")
        // Call the Start Function to go back to the main menu
        start()


    })
}

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

// let salary = 0;
function engineeringCosts() {
    // connection.query('SELECT salary FROM role', 

    connection.query('SELECT salary FROM role WHERE ?',
        {
            title: 'Engineering'

        },
        (err, results) => {
            if (err) throw err;
            // View the results
            // console.log(results[0].salary)
            let pay = 0
            results.map((item) => {

                // console.log(item.salary)
                pay += item.salary
                // console.log(pay)
            })
            console.log(`Salary total for the Engineering Department is ${pay} \n`)
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
    connection.query('SELECT salary FROM role', (err, results) => {
        if (err) throw err;
        // View the results
        console.log(results[0].salary)
        let pay = 0
        results.map((item) => {

            // console.log(item.salary)
            pay += item.salary
            // console.log(pay)
        })
        console.log(`Salary total for the Engineering Department is ${pay} \n`)

        // Call the Start Function to go back to the main menu
        start()
    })

}
function legalCosts() {
    console.log("Legal Costs")
    connection.query('SELECT salary FROM role WHERE ?',
        {
            title: "Legal"

        },
        (err, results) => {
            if (err) throw err;
            // View the results
            console.log(results[0].salary)
            let pay = 0
            results.map((item) => {

                // console.log(item.salary)
                pay += item.salary
                // console.log(pay)
            })
            console.log(`Salary total for the Engineering Department is ${pay} \n`)

            // Call the Start Function to go back to the main menu
            start()
        })

}

function salesCosts() {
    console.log("Sales Costs")
    connection.query('SELECT salary FROM role', (err, results) => {
        if (err) throw err;
        // View the results
        console.log(results[0].salary)
        let pay = 0
        results.map((item) => {

            // console.log(item.salary)
            pay += item.salary
            // console.log(pay)
        })
        console.log(`Salary total for the Engineering Department is ${pay} \n`)

        // Call the Start Function to go back to the main menu
        start()
    })
}