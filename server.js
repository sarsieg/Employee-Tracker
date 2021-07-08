// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

// mysql connection
const connection = mysql.createConnection({
    host: 'localhost',

    // your port if not 3306
    port: 3306,

    // your username
    user: 'root',

    // your password
    password: 'PlacePassWordHere',
    database: 'employeesDB'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log(`
    ╔═══╗─────╔╗──────────────╔═╗╔═╗
    ║╔══╝─────║║──────────────║║╚╝║║
    ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
    ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
    ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
    ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
    ───────║║──────╔═╝║─────────────────────╔═╝║
    ───────╚╝──────╚══╝─────────────────────╚══╝`)

    firstPrompt();

});

// prompts the user for what action they should take
function firstPrompt() {

    inquirer
        .prompt({
            type: "list",
            name: "task",
            message: "What would you like to do?",
            choices: [
                "View Employees",
                "View Employees by Department",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Add Role",
                "End"
            ]
        })
        .then(function({ task }) {
            switch (task) {
                case "View Employees":
                    viewEmployee();
                    break;

                case "View Employees by Department":
                    viewEmployeeByDepartment();
                    break;

                case "AddEmployee":
                    AddEmployee();
                    break;

                case "Remove Employees":
                    removeEmployees();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
            }
        })
}