// load dependencies
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

    // throw error if there is issue connecting 
    if (err) throw err;

    // prompt user with inquirer
    cli_prompt();

});

// array of actions to prompt user
const mainPrompt = [
    
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
    inquirer.prompt(mainPrompt)
    
    // await user responce from inquirer
    .then(function(answer) {

        // execute function viewAll if user selection is "View employees"
        if(answer.action == "View employees") {
            
            viewAll();
        
        // execute function viewDept if user selection is "View departments"
        }else if(answer.action == "View departments") {

            viewDept();

        // execute function viewRoles if user selection is "View roles"
        }else if(answer.action == "View roles") {

            viewRoles();

        // execute function addEmployee if user selection is "Add employee"
        }else if(answer.action == "Add employee") {

            addEmployee();
            
        // execute function addDept if user selection is "Add department"
        }else if(answer.action == "Add department") {

            addDept();
       
        // execute function addRole if user selection is "Add roles"
        }else if(answer.action == "Add role") {

            addRole();


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
        
        // throw error if there is issue accessing data
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

// add new employee to employee_db
function addEmployee() {

    // SQL command to get data from roles table
    let query = "SELECT title FROM roles";
    
    // SQL command to get first_name and last_name data from employees table
    let query2 = "SELECT first_name, last_name FROM employees";

    // connect to mySQL using query instruction 1 to access data from roles table
    connection.query(query, function(err, res){

        // throw error if there is issue accessing data
        if (err) throw err;

        // assign data from roles table (res) to rolesList 
        let rolesList = res;

        // connect to mySQL using query instruction 2 to access dept_name from department table
        connection.query(query2, function(err,res) {
            
            // throw error if there is issue accessing data
            if (err) throw err;

            // print data retrieved to terminal in table format 
            console.table(res);

            // assign data from employees table (res) to managerList
            let managerList = res;

            // array of actions to prompt user
            let addEmpPrompt = [

                {
            
                    name: "first_name",
                    type: "input",
                    message: "Enter new employee's first name."
                    
                },
            
                {
            
                    name: "last_name",
                    type: "input",
                    message: "Enter new employee's last name."
                    
                },
            
                {
            
                    name: "select_role",
                    type: "list",
                    message: "Select new employee's role.",

                    // dynamic choises using rolesList (title col of roles table)
                    choices: function() {
                        
                        // init roles array - used to return existing roles titles as choises array prompted to user
                        roles = [];
                        
                        // loop through rolesList to extract the role titles from rolesList which is an object array containing data from roles table in the form of rowPackets
                        for(i = 0; i < rolesList.length; i++) {
                            
                            // looping parameter "i" will allways align with the table index, therefore by adding 1 we have effectivly converted it to match table id's
                            const roleId = i + 1;

                            // concat roleId and title strings and push the resulting string into our roles (choises) array 
                            roles.push(roleId + ": " + rolesList[i].title);

                        };
                        
                        // return roles (choises) array to be rendered by inquirer to the user 
                        return roles;
            
                    }
                    
                },

                {
            
                    name: "select_manager",
                    type: "list",
                    message: "Select new employee's manager",
                    
                    // dynamic choises using managerList (first_name and last_name cols of employees table)
                    choices: function() {
                        
                        // init managers array - used to return existing employee names as choises array prompted to user
                        managers = [];
            
                        // loop through managerList to extract the employee names from managerList which is an object array containing data from employees table in the form of rowPackets
                        for(i = 0; i < managerList.length; i++) {
                            
                            // looping parameter "i" will allways align with the table index, therefore by adding 1 we have effectivly converted it to match table id's
                            const mId = i + 1;

                            // concat mId, first_name, and last_name strings and push the resulting string into our managers (choises) array
                            managers.push(mId + ": " + managerList[i].first_name + " " + managerList[i].last_name);
                            
                        };
                        
                        // add string "0: None" to the beginning of managers (choises)
                        managers.unshift("0: None");

                        // return managers (choises) array to be rendered by inquirer to the user 
                        return managers;
            
                    }
                    
                }
            
            ];
            
            // prompt user actions using inquirer 
            inquirer.prompt(addEmpPrompt)

            // await user responce from inquirer
            .then(function(answer) {

                console.log(answer);

                // SQL command to insert new data in employees table
                let query = "INSERT INTO employees SET ?";

                // connect to mySQL using query instruction to insert new employee in employee table
                connection.query(query,
                {

                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    
                    // new emplyees table role_id col value is extracted by parsing roleId from the selected roles array string and converting it to int
                    role_id: parseInt(answer.select_role.split(":")[0]),

                    // new emplyees table manager_id col value is extracted by parsing mId from the selected managers array string and converting it to int
                    manager_id: parseInt(answer.select_manager.split(":")[0])

                },
                function(err, res){

                    // throw error if there is issue writing data
                    if (err) throw err;
                
                })

                // array of actions to prompt user
                let addagainPrompt = [

                    {
                
                        name: "again",
                        type: "list",
                        message: "Would you like to add another employee?",
                        choices: ["Yes","Exit"]
                    
                    }

                ];

                // prompt user actions using inquirer 
                inquirer.prompt(addagainPrompt)

                // await user responce from inquirer
                .then(function(answer) {

                    // SQL command to get first_name and last_name data from employees table
                    let query = "SELECT first_name, last_name FROM employees";

                    // connect to mySQL using query instruction to access first_name, last_name from employees table
                    connection.query(query, function(err,res) {
            
                        // throw error if there is issue accessing data
                        if (err) throw err;

                        // execute function addEmployee again if user selection is "Yes"
                        if(answer.again == "Yes") {

                            // prompt add new employee to employee_db
                            addEmployee();
                        
                        // update employee first/ last_name table in terminal, and execute function cli_prompt if user selection is "Exit"
                        }else if(answer.again == "Exit") {

                            // print data retrieved to terminal in table format 
                            console.table(res);

                            // prompt user for next action
                            cli_prompt(); 

                        };  

                    });

                });  

            });

        })

    })
    
};

// add new department to employee_db
function addDept() {

    // SQL command to get data from department table
    let query = "SELECT department.dept_name FROM department" ;

    // connect to mySQL using query instruction to access data from department tables
    connection.query(query, function(err, res){

        // throw error if there is issue accessing data
        if (err) throw err;

        // print data retrieved to terminal in table format 
        console.table(res);
        
        // array of actions to prompt user
        let addDeptPrompt = [

            {
        
                name: "new_department",
                type: "input",
                message: "Enter a new company department."
                
            },
        
        ];
        
        // prompt user actions using inquirer 
        inquirer.prompt(addDeptPrompt)

        // await user responce from inquirer
        .then(function(answer) {

            console.log(answer);

            // SQL command to insert new data in department table
            let query = "INSERT INTO department SET ?";
            
            // connect to mySQL using query instruction to insert new company department in department table
            connection.query(query,
            {
                // write new department srting from user answers to dept_name col in department table, which has auto generated id so only one item import is needed
                dept_name: answer.new_department

            }, function(err, res){

                // throw error if there is issue writing data
                if (err) throw err;
                
            });
            
            // array of actions to prompt user
            let addagainPrompt = [

                {
        
                    name: "again",
                    type: "list",
                    message: "Would you like to add another department?",
                    choices: ["Yes","Exit"]
    
                },

            ];

            // prompt user actions using inquirer 
            inquirer.prompt(addagainPrompt)

            // await user responce from inquirer
            .then(function(answer) {

                // SQL command to get data from department table
                let query = "SELECT department.dept_name FROM department" ;

                // connect to mySQL using query instruction to access data from department tables
                connection.query(query, function(err, res){

                    // throw error if there is issue accessing data
                    if (err) throw err;

                    // execute function addDept again if user selection is "Yes"
                    if(answer.again == "Yes") {

                        // prompt add new department to employee_db
                        addDept();
                    
                    // update department name table displayed in terminal, and execute function cli_prompt if user selection is "Exit"
                    }else if(answer.again == "Exit") {

                        // print data retrieved to terminal in table format 
                        console.table(res);

                        // prompt user for next action
                        cli_prompt(); 

                    };  

                });

            });

        });

    });

};

// add new role to employee_db
function addRole() {

    // SQL command to get data from roles table and data from department.dept_name where department.id = roles.department_id
    let query1 = "SELECT roles.title, roles.salary, department.dept_name FROM roles INNER JOIN department ON department.id = roles.department_id;";

    // SQL command to get dept_name data from department table - used for prompting list of availible departments to pick from
    let query2 = "SELECT department.dept_name FROM department" ;

    // connect to mySQL using query instruction 1 to access data from roles & department tables
    connection.query(query1, function(err, res){

        // throw error if there is issue accessing data
        if (err) throw err;

        // print data retrieved to terminal in table format 
        console.table(res);

        // connect to mySQL using query instruction 2 to access dept_name from department table
        connection.query(query2, function(err,res) {
            
            // throw error if there is issue accessing data
            if (err) throw err;

            // assign data from dept_name (res) to departmentList 
            let departmentList = res;

            // array of actions to prompt user
            let addRolePrompt = [

                {
            
                    name: "add_role",
                    type: "input",
                    message: "Enter a new company role."
                    
                },

                {
            
                    name: "add_salary",
                    type: "input",
                    message: "Enter a salary for this role."
                    
                },

                {
            
                    name: "select_department",
                    type: "list",
                    message: "Select a department.",

                    // dynamic choises using departmentList (dept_name col of department table)
                    choices: function() {
                        
                        // init departments array - used to return existing department names as choises array prompted to user 
                        departments = [];
                        
                        // loop through departmentList to extract the department names from depatmentList which is an object array containing data from department table in the form of rowPackets
                        for(i = 0; i < departmentList.length; i++) { 
                            
                            // looping parameter "i" will allways align with the table index, therefore by adding 1 we have effectivly converted it to match table id's 
                            const roleId = i + 1;

                            // concat roleId and dept_name strings and push the resulting string into our departments (choises) array 
                            departments.push(roleId + ": " + departmentList[i].dept_name);

                        };
                        
                        // return departments (choises) array to be rendered by inquirer to the user 
                        return departments;

                    }

                }
            
            ];
            
            // prompt user actions using inquirer 
            inquirer.prompt(addRolePrompt)

            // await user responce from inquirer
            .then(function(answer) {

                console.log(answer);

                // SQL command to insert new data in roles table
                let query = "INSERT INTO roles SET ?";

                // connect to mySQL using query instruction to insert new company role in roles table
                connection.query(query,
                {
                    title: answer.add_role,
                    salary: answer.add_salary,
                    
                    // department_id is extracted by parsing roleId from the selected departments array string and converting it to int
                    department_id: parseInt(answer.select_department.split(":")[0])

                }, function(err, res){

                    // throw error if there is issue writing data
                    if (err) throw err;
                    
                });

                // array of actions to prompt user
                let addagainPrompt = [

                    {
            
                        name: "again",
                        type: "list",
                        message: "Would you like to add another role?",
                        choices: ["Yes","Exit"]

                    },

                ];

                // prompt user actions using inquirer 
                inquirer.prompt(addagainPrompt)

                // await user responce from inquirer
                .then(function(answer) {

                    // SQL command to get data from roles table and data from department.dept_name where department.id = roles.department_id
                    let query = "SELECT roles.id, roles.title, roles.salary, department.dept_name FROM roles INNER JOIN department ON department.id = roles.department_id;";

                    // connect to mySQL using query instruction to access first_name, last_name from employees table
                    connection.query(query, function(err,res) {
            
                        // throw error if there is issue accessing data
                        if (err) throw err;

                        // execute function addRole again if user selection is "Yes"
                        if(answer.again == "Yes") {

                            // prompt add new role to employee_db
                            addRole();
                        
                        // update role table displayed in terminal, and execute function cli_prompt if user selection is "Exit"
                        }else if(answer.again == "Exit") {

                            // print data retrieved to terminal in table format 
                            console.table(res);

                            // prompt user for next action
                            cli_prompt(); 

                        };  

                    });

                });

            });

        });

    });
    
};

// exit employee-traker 
function exit() {

    // terminate mySQL connection
    connection.end();

    // say good bye
    console.log("Have a good one!");

};
