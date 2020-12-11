# Unit 12 MySQL Homework: Employee Tracker

## Description

This application is a Company Employee Information Content Managment System (CMS). This CMS tool uses a node backend along with inquirer to enable user management of company employees, roles, and departments in MySQL database employee_db through easy to use CLI. The application can be easily deployed from any local directory containing required files and packages, and utilized as a CLI in terminal.

![Employee Tracker](Assets/employee-tracker.gif)

Watch YouTube demo of the app using the following link: 
> https://youtu.be/zVsruSLPKLQ


## Table of Contents

* [Installation](#installation) 
* [License](#license) 
* [Contributors](#contributing) 
* [Tests](#tests)
* [Revisions](#Revisions) 

## Installation

Run the app locally by navigating to app directry in terminal and running the following commands:
> npm i

> node server.js

## License

![License](https://img.shields.io/badge/License-none-blue.svg)

## Contributing

none

## Tests

none

## Revisions

employee-tracker_v1.0 - Initial commit. Added schema.sql file and created initial sql database configuration. 

employee-tracker_v1.1 - Added file server.js, which sets up a mySQL instance, prompts users with action items using inquire, and based on user selection determines how to query employee_db. Currently, server.js is capable of viewing employees, department, and roles tables. The user also has the option to terminate the application by selecting "EXIT".

employee-tracker_v1.2 - Added function addEmployee to give functionality to user option "Add employee", and gives the user ability to add a new employee to emplyees table in emplyee_db (server.js lines 170-371); Added function addDept to give functionality to user option "Add department", and gives the user abiltiy to add a new departemnt to department table in emplyee_db (server.js lines 373-479); Added function addRole to give functionality to user option "Add role", and gives the user abiltiy to add a new role to roles table in emplyee_db (server.js lines 482-442).

employee-tracker_v1.3 - Added function updateEmployee to give functionality to user option "Edit employee", and gives the user ability to edit the role and reporting manager of an existing employee (server.js lines 771-1094); Refined the table queries used to get mySQL data to display in terminal, this update provides more relevant info displayed to the user when viewing tables in console/terminal.

employee-tracker_v1.4 - Added function deleteEmployee to give functionality to user option "Remove employee", and gives the user ability to remove existing employee's in employees table from employee_db (server.js lines 1103-1296);
- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
