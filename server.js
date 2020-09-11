const mysql = require('mysql');
const inquirer = require('inquirer');

// creates connection to sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Nxxsk811!seaBa55',
    database: 'employee_db'
});

// connects to sql server and sql database
connection.connect(function(err){

    // throw error if the is issue connecting 
    if (err) throw err;

    // prompt user with inquirer
    cli_prompt();

});

// array of actions to prompt user
const userPrompt = [
    
    {

        name: "action",
        type: "list",
        message: "Select an action",
        choices: [
            
            "View employees",
            "View departments",
            "View roles",
            "Add employee",
            "Add department",
            "Add role",
            "Edit employee role",
            "Remove employee",
            "EXIT"
            
        ]
        
    }

];

// prompt user with inquirer and execute function corresponding to user selection
function cli_prompt() {
   
    // prompt user actions using inquirer 
    inquirer.prompt(userPrompt)
    
    // await user responce from inquirer
    .then(function(answer) {

        // execute function viewAll if user selection is "View all employees"
        if(answer.action == "View all employees") {
            
            viewAll();
        
        // execute function viewDept if user selection is "View all departments"
        }else if(answer.action == "View all departments") {

            viewDept();

        // execute function viewRoles if user selection is "View all roles"
        }else if(answer.action == "View all roles") {

            viewRoles();

        // execute function EXIT if user selection is "EXIT"
        }else if(answer.action == "EXIT") {

            exit();

        };
        

    });    

};

// view all employees in employee_db
function viewAll() {

    // SQL command to get data from employees table
    let query = "SELECT * FROM employees";

    // connect to mySQL useing query instruction to access employees table
    connection.query(query, function(err, res) {
        
        // throw error if the is issue accessing data
        if (err) throw err;

        // print data retrieved to terminal in table format 
        console.table(res); 
        
        // prompt user for next action
        cli_prompt();

    });

};

// view all departments in employee_db
function viewDept() {

    // SQL command to get data from departments table
    let query = "SELECT * FROM department";

    // connect to mySQL useing query instruction to access departments table
    connection.query(query, function(err, res) {
        
        // throw error if the is issue accessing data
        if (err) throw err;

        // print data retrieved to terminal in table format 
        console.table(res); 
        
        // prompt user for next action
        cli_prompt();

    });

};

// view all roles in employee_db
function viewRoles() {

    // SQL command to get data from roles table
    let query = "SELECT * FROM roles";

    // connect to mySQL useing query instruction to access roles table
    connection.query(query, function(err, res) {
        
        // throw error if the is issue accessing data
        if (err) throw err;

        // print data retrieved to terminal in table format 
        console.table(res); 
        
        // prompt user for next action
        cli_prompt();

    });

};

// exit employee-traker 
function exit() {

    // terminate mySQL connection
    connection.end();

    // say good bye
    console.log("Have a good one!");

};
