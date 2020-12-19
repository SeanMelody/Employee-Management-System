function update() {
    inquirer
        // Prompt to ask what employee the user would like to update
        .prompt({
            name: 'updateRole',
            type: 'list',
            message: 'Which employee would you like to update?',
            choices: ['Emoloyee1', 'Emoloyee2', 'Emoloyee3', 'Emoloyee4'],
        })

        .then((answer) => {
            console.log(answer)
        })

}