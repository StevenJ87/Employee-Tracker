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
  runSearch();
});

// Start Program
function runSearch() {
// console.log(`
//     ░█▀▀▀ █▀▄▀█ █▀▀█ █── █▀▀█ █──█ █▀▀ █▀▀ 
//     ░█▀▀▀ █─▀─█ █──█ █── █──█ █▄▄█ █▀▀ █▀▀ 
//     ░█▄▄▄ ▀───▀ █▀▀▀ ▀▀▀ ▀▀▀▀ ▄▄▄█ ▀▀▀ ▀▀▀ 
    
//     ▀▀█▀▀ █▀▀█ █▀▀█ █▀▀ █─█ █▀▀ █▀▀█ 
//     ─░█── █▄▄▀ █▄▄█ █── █▀▄ █▀▀ █▄▄▀ 
//     ─░█── ▀─▀▀ ▀──▀ ▀▀▀ ▀─▀ ▀▀▀ ▀─▀▀
//     `)

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
    inquirer.prompt(addADepartment)
    .then(answer=>
    connection.query(`
    INSERT INTO department (id,dep_name)
    VALUES (?,?);
    `,
    [
        answer.id,
        answer.dep_name
    ], function (err, res){
        if (err) throw err;
        console.table(answer.dep_name+" Added \n")
    }
    )
    )
};

function addRole(){

};
function addEmp(){

};
function viewDep(){
    connection.query(`
    SELECT * FROM department;
    `, function (err, res){
        if (err) throw err;
        console.table(res)});
        orExit();
};
function viewRole(){

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
        name: "id",
        type: "input",
        message: "Input a unique numerical value for this department" 
    },
    {
        name: "dep_name",
        type: "input",
        message: "What is this departments name?"
    }
];