DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
id INT PRIMARY KEY,
name VARCHAR(30) NULL
);

CREATE TABLE role (
id INT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT
);

CREATE TABLE employee (
id INT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);