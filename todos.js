#! /usr/bin/env node
import inquirer from "inquirer";
let todo_list = [];
let while_condition = true;
while (while_condition) {
    //---------------------------options------------------//
    let option = await inquirer.prompt([{
            type: 'list',
            name: "user_option",
            message: 'select an option',
            choices: ["Add", "showlist", "update", "remove"],
        }]);
    //---------------------------Add-----------------------//
    if (option.user_option === "Add") {
        let ans = await inquirer.prompt([{
                type: 'input',
                name: 'user_ans',
                message: 'Write something to add in the list.'
            }]);
        if (ans.user_ans !== '') {
            todo_list.push(ans.user_ans);
            console.log(todo_list);
        }
        else {
            console.log('Please write something to add in the list');
        }
    }
    //---------------------------showlist-----------------------//
    else if (option.user_option === "showlist") {
        if (todo_list.length > 0) {
            console.log("your list: ");
            todo_list.forEach((item) => {
                console.log(`${item}`);
            });
        }
        else {
            console.log("The list is empty");
        }
    }
    //---------------------------Remove-----------------------//
    else if (option.user_option === "remove") {
        let removeChoices = await inquirer.prompt([{
                type: 'list',
                name: 'remove_item',
                message: 'select item to remove',
                choices: todo_list
            }]);
        let index_to_remove = todo_list.indexOf(removeChoices.remove_item);
        if (index_to_remove >= 0) {
            todo_list.splice(index_to_remove, 1);
            console.log('you removed: ', removeChoices.remove_item);
            console.log(todo_list);
        }
    }
    //---------------------------update-----------------------//
    else if (option.user_option === "update") {
        if (todo_list.length > 0) {
            let updateShow = await inquirer.prompt([{
                    type: 'list',
                    name: 'updateItem',
                    message: 'select item to update',
                    choices: todo_list,
                }]);
            let index = todo_list.indexOf(updateShow.updateItem);
            let editValue = await inquirer.prompt([{
                    type: 'input',
                    name: 'editItem',
                    message: 'enter the updated task',
                }]);
            if (editValue.editItem !== "") {
                todo_list[index] = editValue.editItem;
                console.log("Task updated successfully:");
                console.log("Updated task:");
                todo_list.forEach((item) => {
                    console.log(`${item}`);
                });
            }
            else {
                console.log("The to-do list is empty.please add task before update:");
            }
        }
    }
    //---------------------------Confirm-----------------------//
    let user_ans = await inquirer.prompt([{
            type: 'confirm',
            name: 'selection',
            message: ' Do you want to continue',
            default: true
        }]);
    if (user_ans.selection === false) {
        while_condition = false;
    }
}
console.log(`Thank you for using todo list....`);
