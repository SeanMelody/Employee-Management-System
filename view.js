// Const to require mysql for the database
const mysql = require("mysql");
// Const to be able to use Inquirer to ask questions to the user
const inquirer = require("inquirer");
// Const Ctable as it is required for the homework to display the tables
const cTable = require('console.table');
// Const Colors to color the text in the console. Yeay!
const colors = require('colors');

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
// SELECT manager_id, first_name, last_name FROM employee INNER JOIN employee ON employee.id=employee.manager_id'

//SELECT manager_id, first_name, last_name FROM employee INNER JOIN employee ON employee.id=employee.manager_id'
function viewEmployeesManager() {
    // Connect to the database and ask the question

    //Thank you to Mike S from Stack overflow who answered a similar question in 2021
    connection.query('SELECT e.first_name AS Employee, m.first_name AS Manager FROM employee e INNER JOIN employee m ON m.id=e.manager_id ORDER BY e.id', (err, results) => {
        if (err) throw err;
        // View the results
        console.table(results)
        console.log("\n")
        // Call the Start Function to go back to the main menu
        start()


    })
}
//SAVE THIS!!!!
// function viewDepartmentCosts() {
//     inquirer
//         // Prompt to ask what the user would like displayed
//         .prompt({
//             name: 'viewDeptCosts',
//             type: 'list',
//             message: 'Which department would you like to see the costs for',
//             choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Main Menu'],
//         })

//         // Get the answer to the question
//         .then((answer) => {
//             // Based on their answer, either call the Functions to get the information they want, or return to main menu!
//             if (answer.viewDeptCosts === 'Engineering') {
//                 // Call the View Departments Function
//                 engineeringCosts()
//             } else if (answer.viewDeptCosts === 'Finance') {
//                 // Call the View Roles Function
//                 financeCosts()
//             } else if (answer.viewDeptCosts === 'Legal') {
//                 // Call the View Employees Function
//                 legalCosts()
//             } else if (answer.viewDeptCosts === 'Sales') {
//                 // Call the View Employees Function
//                 salesCosts()
//             } else {
//                 // Call the Start Function to go back to the main menu
//                 start()
//             }
//         });
// };

//TEST
function viewDepartmentCosts() {
    inquirer
        // Prompt to ask what the user would like displayed
        .prompt({
            name: 'viewDeptCosts',
            type: 'input',
            message: 'Which department would you like to see the costs for? ',
        })

        // Get the answer to the question
        .then((answer) => {
            // console.log(answer)
            connection.query('SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON department.id=role.department_id WHERE ?',
                {
                    name: answer.viewDeptCosts

                },
                (err, results) => {
                    if (err) throw err;
                    console.table(results)

                    let pay = 0
                    results.map((item) => {

                        pay += item.salary
                    })
                    console.log(`Salary total for the ${answer.viewDeptCosts} Department is ${pay} \n`)

                    // Call the Start Function to go back to the main menu
                    start()
                })

        });



};
//END TEST

// let salary = 0;
function engineeringCosts() {
    // connection.query('SELECT salary FROM role', 
    //SELECT * FROM role LEFT JOIN department ON department.id=role.department_id
    connection.query('SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON department.id=role.department_id WHERE ?',
        {
            name: 'Engineering'

        },
        (err, results) => {
            if (err) throw err;
            console.table(results)
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
    connection.query('SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON department.id=role.department_id WHERE ?',
        {
            name: 'Finance'

        },
        (err, results) => {
            if (err) throw err;
            console.table(results)
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
function legalCosts() {
    // console.log("Legal Costs")
    connection.query('SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON department.id=role.department_id WHERE ?',
        {
            name: 'Legal'

        },
        (err, results) => {
            if (err) throw err;
            console.table(results)
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


// export so we can use all this data
module.exports = view;