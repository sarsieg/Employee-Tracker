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