// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const { allowedNodeEnvironmentFlags } = require("process");
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

                case "Add Role":
                    addRole();
                    break;

                case "End":
                    connection.end();
                    break;

            }
        });
}

// view employees
// READ all, SELECT * FROM 
function viewEmployee() {
    console.log("Viewing employees\n");

    var query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name AS manager
    FROM employee e
    LEFT JOIN role r
        ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`

    connection.query(query, function(err, res) {
        if (err) throw err;

        console.table(res);
        console.log("Employees viewed!\n");

        firstPrompt();
    });
}

// "View Employees by Department" / READ by, SELECT * FROM
// Make a department array
function viewEmployeeByDepartment() {
    console.log("Viewing employees by department\n")

    var query =
        `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN ROLE R
        ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name `

    connection.query(query, function(err, rest) {
        if (err) throw err;

        const departmentChoices = res.map(data => ({
            value: data.id,
            name: data.name
        }));

        console.table(res);
        console.log("Department view succeed!\n");

        promptDepartment(departmentChoices)
    });
}

//user choose the department list then employees pop up
function promptDepartment(departmentChoices) {

    inquirer
        .prompt([{
            type: "list",
            name: "departmentId",
            message: "Which department would you choose?",
            choices: departmentChoices
        }])
        .then(function(answer) {
            console.log("answer ", answer.deepartmentId);

            var query =
                `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
        FROM employee e
        JOIN role r
            ON e.role_id = r.id
        JOIN department d
        ON d.id = r.department_id
        WHERE d.id = ?`

            connection.query(query, answer.departmentId, function(err, res) {
                if (err) throw err;

                console.table("response", res);
                console.log(res.affectedRows + "Employees are viewed!\n");

                firstPrompt()
            });
        });
}

// make employee array
function AddEmployee() {
    console.log("Inserting an employee!")

    var query =
        `SELECT r.id, r.title, r.salary
        FROM role r`

    connection.query(query, function(err, res) {
        if (err) throw err;

        const roleChoices = res.map(({ id, title, salary }) => ({
            value: id,
            title: `${title}`,
            salary: `${salary}`
        }));

        console.table(res);
        console.log("RoleToInsert!");

        promptInsert(roleChoices)
    });
}