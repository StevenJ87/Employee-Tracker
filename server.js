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
            viewDep();
            break;
    
        case "View Role":
            viewRole();
            break;
    
        case "View Employee":
            viewEmp();
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
// Function
function addDep(){
    viewDep3()
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

function addRole(){
    viewRole2()
    .then(results=>{
return new Promise((resolve,reject)=>{
    inquirer.prompt(addARole)
    .then(answer=>
    connection.query(`
    INSERT INTO job_role (id,title,salary,department)
    VALUES (?,?,?,?);
    `,
    [
        answer.id,
        answer.title,
        answer.salary,
        answer.department.split(" ")[0],
    ], function (err, res){
        if (err) throw err;
        console.table(answer.title+" Added \n");
        resolve(results);
    })
    )})
    }
    ).then(results=>{orExit()});
};
function addEmp(){

};
function viewDep(){
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM department", function (err, results){
            if (err) throw err;
            console.table(results);
            resolve(results);
        })
    }).then(results=>{orExit()});  
};
function viewDep3(){
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM department", function (err, results){
            if (err) throw err;
            console.table(results);
            resolve(results);
        })
    })  
};
function viewDep2(){
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM department", function (err, results){
        if (err) throw err;
        resolve(results);
        })
    })
    
};
function viewRole(){
    return new Promise((resolve,reject)=>{
         connection.query(`
        SELECT * FROM job_role;
         `, function (err, results){
        if (err) throw err;
        console.table(results);
        resolve(results);
    })
}).then(results=>{orExit()});
};
function viewRole2(){
    return new Promise((resolve,reject)=>{
         connection.query(`
        SELECT * FROM job_role;
         `, function (err, results){
        if (err) throw err;
        console.table(results);
        resolve(results);
    })
})
};
function viewEmp(){

};
function updateDep(){

};
function updateRole(){

};
function updateEmp(){

};
function deleteDep(){

};
function deleteRole(){

};
function deleteEmp(){

};


// Prompts
const addADepartment = [
    {
        name: "dep_name",
        type: "input",
        message: "What is this departments name?"
    }
];

let departments =[]
let addARole = []
viewDep2().then(results=>{
  departments =  results.map(name=>name.id + " "+name.dep_name)
  addARole = [
    {
        name: "id",
        type: "input",
        message: "Input a unique numerical value for this role" 
    },
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


const addEmployee = [
    {
        name: "id",
        type: "input",
        message: "Input a unique numerical value for this department" 
    }
];