// Server Connection
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "SQLRoot2020!",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  welcome();
  runSearch();
});

// Start Program
function welcome(){
    return new Promise((resolve,reject)=>{
            console.log(`
        ░█▀▀▀ █▀▄▀█ █▀▀█ █── █▀▀█ █──█ █▀▀ █▀▀ 
        ░█▀▀▀ █─▀─█ █──█ █── █──█ █▄▄█ █▀▀ █▀▀ 
        ░█▄▄▄ ▀───▀ █▀▀▀ ▀▀▀ ▀▀▀▀ ▄▄▄█ ▀▀▀ ▀▀▀ 
        
        ▀▀█▀▀ █▀▀█ █▀▀█ █▀▀ █─█ █▀▀ █▀▀█ 
        ─░█── █▄▄▀ █▄▄█ █── █▀▄ █▀▀ █▄▄▀ 
        ─░█── ▀─▀▀ ▀──▀ ▀▀▀ ▀─▀ ▀▀▀ ▀─▀▀
        `);
        }).then(results=>{runSearch()});  
}

// Menu
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Role",
        "View Employee",
        "Update Department",
        "Update Role",
        "Update Employee",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Add Department":
            addDep();
            break;

        case "Add Role":
            addRole();
            break;

        case "Add Employee":
            addEmp();
            break;

        case "View Department":
            viewDep()
            .then(res=>{console.table(res);
            orExit();
            })
            break;
    
        case "View Role":
            viewRole()
            .then(res=>{console.table(res);
            orExit();
            });
            break;
    
        case "View Employee":
            viewEmp()
            .then(res=>{console.table(res);
            orExit();
            });
            break;

        case "Update Department":
            updateDep();
            break;

        case "Update Role":
            updateRole();
            break;

        case "Update Employee":
            updateEmp();
            break;

        case "Delete Department":
            deleteDep();
            break;

        case "Delete Role":
            deleteRole();
            break;

        case "Delete Employee":
            deleteEmp();
            break;

        case "exit":
            connection.end();
            break;
      }
    });
}

// Return to Menu
function orExit(){
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Return to Menu",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Return to Menu":
            runSearch();
            break;

        case "exit":
            connection.end();
            break;
      }
    });
}

// Functions

// Add Department
function addDep(){
    viewDep()
    .then(res=>{console.table(res)})
    .then(results=>{
return new Promise((resolve,reject)=>{
        inquirer.prompt(addADepartment)
        .then(answer=>
        connection.query(`
        INSERT INTO department (dep_name)
        VALUES (?);
        `,
        [
            answer.dep_name
        ], function (err, res){
            if (err) throw err;
            console.table(answer.dep_name+" Added \n");
            resolve(results);
        })
    )})
    }
    ).then(results=>{orExit()});
};

// Add Role
function addRole(){
    depReset()
    viewRole()
    .then(res=>{console.table(res)})
    .then(results=>{
return new Promise((resolve,reject)=>{
    inquirer.prompt(addARole)
    .then(answer=>
    connection.query(`
    INSERT INTO job_role (title,salary,department,dep_name)
    VALUES (?,?,?,?);
    `,
    [
        answer.title,
        answer.salary,
        answer.department.split(" ")[0],
        answer.department.split(" ")[1],
    ], function (err, res){
        if (err) throw err;
        console.table(answer.title+" Added \n");
        resolve(results);
    })
    )})
    }
    ).then(results=>{orExit()});
};

// Add Employee
function addEmp(){
    depReset()
    roleReset()
    viewEmp()
    .then(res=>{console.table(res)})
    .then(results=>{
return new Promise((resolve,reject)=>{
    inquirer.prompt(addEmployee)
    .then(answer=>
    connection.query(`
    INSERT INTO employee (first_name,last_name,job_role,title)
    VALUES (?,?,?,?);
    `,
    [
        answer.first_name,
        answer.last_name,
        answer.job_role.split(" ")[0],
        answer.job_role.split(" ")[1],
    ], function (err, res){
        if (err) throw err;
        console.table(answer.first_name+answer.last_name+" Added \n");
        resolve(results);
    })
    )})
    }
    ).then(results=>{orExit()});
};

// View Departments
function viewDep(){
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM department", function (err, results){
            if (err) throw err;
            resolve(results);
        })
    })  
};

// View Roles
function viewRole(){
    return new Promise((resolve,reject)=>{
         connection.query(`
        SELECT * FROM job_role;
         `, function (err, results){
        if (err) throw err;
        resolve(results);
    })
})
};

// View Employees
function viewEmp(){
    return new Promise((resolve,reject)=>{
        connection.query(`
        SELECT * FROM employee;
        `, function (err, results){
        if (err) throw err;
        resolve(results);
   })
})
};

// Update Department
function updateDep(){
    depReset()
    viewDep()
    .then(res=>{console.table(res)})
    .then(results=>{
    return new Promise((resolve,reject)=>{
        inquirer.prompt(depUpdate)
            .then(answer=>
                connection.query(`
      UPDATE department SET ? WHERE ?
      `,[
        {
          dep_name: answer.dep_name
        },
        {
          id: answer.id.split(" ")[0]
        }
      ],
      function(err, res) {
        if (err) throw err;
        resolve(results);
        console.log(answer.dep_name+" updated!\n");
    })
    )})
    }
    ).then(results=>{orExit()});
};

// Update Roles
function updateRole(){
    depReset()
    roleReset()
    viewRole()
    .then(res=>{console.table(res)})
    .then(results=>{
return new Promise((resolve,reject)=>{
    inquirer.prompt(updateARole)
    .then(answer=>
    connection.query(`
    UPDATE job_role SET ? WHERE ?
    `,
    [
        {
            title: answer.title,
            salary: answer.salary
          },
          {
            id: answer.id.split(" ")[0]
          }
    ], function (err, res){
        if (err) throw err;
        console.table(answer.title+" Updated \n");
        resolve(results);
    })
    )})
    }
    ).then(results=>{orExit()});
};
// function updateEmp(){

// };
// function deleteDep(){

// };
// function deleteRole(){

// };
// function deleteEmp(){

// };


// Prompts

// Adding Department
const addADepartment = [
    {
        name: "dep_name",
        type: "input",
        message: "What is this departments name?"
    }
];

// Adding Role
let departments =[]
let addARole = []
function depReset(){viewDep().then(results=>{
  departments =  results.map(name=>name.id + " "+name.dep_name)
  addARole = [
    {
        name: "title",
        type: "input",
        message: "What is the name of this new role" 
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary of this role?" 
    },
    {
        name: "department",
        type: "list",
        message: "Which department does this role belong to" ,
        choices: departments
        
    },
];
});
};

// Adding Employee
let roles =[]
let addEmployee = []
function roleReset(){viewRole().then(results=>{
  roles =  results.map(name=>name.id + " "+name.title)
  addEmployee = [
    {
        name: "first_name",
        type: "input",
        message: "What is the employees FIRST name?" 
    },
    {
        name: "last_name",
        type: "input",
        message: "What is the employees LAST name?" 
    },
    {
        name: "job_role",
        type: "list",
        message: "What is theis employees role?" ,
        choices: roles
    },
];
});
};

// Update Department
let depUpdate = [];
function depReset(){viewDep().then(results=>{
  departments =  results.map(name=>name.id + " "+name.dep_name)
  depUpdate = [
    {
        name: "id",
        type: "list",
        message: "Which department would you like to edit?",
        choices: departments
    },
    {
        name: "dep_name",
        type: "input",
        message: "What would you like the department to be called?"
    },
];
});
};

// Update Role
let updateARole = []
function roleReset(){viewRole().then(results=>{
  roles =  results.map(name=>name.id + " "+name.title+ " "+name.salary+ " "+name.dep_name)
  updateARole = [
    {
        name: "id",
        type: "list",
        message: "Which role would you like to edit?",
        choices: roles
    },
    {
        name: "title",
        type: "input",
        message: "What do nyou want the TITLE to be?" 
    },
    {
        name: "salary",
        type: "input",
        message: "What would you like the SALARY to be?" 
    },
];
});
};