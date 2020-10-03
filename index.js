var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Combined1!",
    database: "employeeDB",
});
connection.connect(function (err) {
    if (err) throw err;
    employeeTracker();
});

async function employeeTracker() {
    try {
        const userSearch = await askUserForChoice();
        console.log("You chose: " + userSearch);
        if (userSearch === "Add Department Name") {
            const askDeptName = await addDepartmentName();
            await addNewDepartment(askDeptName);
        } else if (userSearch === "Add Role") {
            const newRoleInfo = await inquirer.prompt(newRoleQuestions)
            await addNewRole(newRoleInfo);
        } else if (userSearch === "Add Employee Name") {
            const newEmpInfo = await inquirer.prompt(newEmployeeQuestions)
            await addNewEmployee(newEmpInfo);
        } else if (userSearch === "View Departments") {
            await displayDepts();
        } else if (userSearch === "View Roles") {
            await displayRoles();
        } else if (userSearch === "View Employees") {
            await displayEmployees();
        } else if (userSearch === "Update Employee Role") {
            const updateEmpInfo = await inquirer.prompt(updateEmployeeQuestions)
            await updateEmployeeRole(updateEmpInfo);
            console.log("You've updated employee name")
        } else if (userSearch === "Exit") {
            console.log("You are finished!");
            connection.end();
        }
    } catch (err) {
        console.log(err)
        connection.end();
    }
}

function askUserForChoice() {
    return inquirer.prompt([{
        name: "firstCommand",
        message: "Choose your command",
        type: "list",
        choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Role", "Exit"]
    }]).then(response => response.firstCommand)
};

function addDepartmentName() {
    return inquirer.prompt([{
        name: "newDepartmentName",
        message: "Name your new department",
        type: "input"
    }]).then(function (response) {
        return response.newDepartmentName;
    });
};

function addNewDepartment(askDeptName) {
    console.log(askDeptName);
    connection.query("INSERT INTO departmentTable (name) VALUE ('" + askDeptName + "')", function (err, result) {
        if (err) throw err;
        console.log("New department created!");
        employeeTracker();
    });
};

const newRoleQuestions = [
    {
        name: "newRoleTitle",
        message: "Name the new role",
        type: "input"
    },
    {
        name: "newRoleSalary",
        message: "Using digits only, enter your new salary",
        type: "number"
    },
    {
        name: "newDeptId",
        message: "Enter department ID for this new role (digits only).",
        type: "number"
    }
]

function addNewRole(newRoleInfo) {
    connection.query("INSERT INTO roleTable (title, salary, department_id) VALUE ('" + newRoleInfo.newRoleTitle + "', '" + newRoleInfo.newRoleSalary + "', '" + newRoleInfo.newDeptId + "')", function (err, result) {
        if (err) throw err;
        console.log("Your new role has been created!");
        employeeTracker();
    });
};

const newEmployeeQuestions = [
    {
        name: "newEmpFirstName",
        message: "Enter employee's first name",
        type: "input"
    },
    {
        name: "newEmpLastName",
        message: "Enter employee's last name",
        type: "input"
    },
    {
        name: "empRoleId",
        message: "Enter employee role ID (digits only).",
        type: "number"
    },
    {
        name: "generalManagerId",
        message: "What is the General Manager's ID? (digits only).",
        type: "number"
    }
]

function addNewEmployee(newEmpInfo) {
    connection.query("INSERT INTO employeeTable (firstName, lastName, role_id, manager_id) VALUE ('" + newEmpInfo.newEmpFirstName + "', '" + newEmpInfo.newEmpLastName + "', '" + newEmpInfo.empRoleId + "', '" + newEmpInfo.generalManagerId + "')", function (err, result) {
        if (err) throw err;
        console.log("New employee created!");
        employeeTracker();
    });
};

function displayDepts() {
    connection.query("SELECT * FROM departmentTable", function (err, result) {
        if (err) throw err;
        console.table(result);
        employeeTracker();
    });
};

function displayRoles() {
    connection.query("SELECT * FROM roleTable", function (err, result) {
        if (err) throw err;
        console.table(result);
        employeeTracker();
    });
};

function displayEmployees() {
    connection.query("SELECT * FROM employeeTable", function (err, result) {
        if (err) throw err;
        console.table(result);
        employeeTracker();
    });
};

const updateEmployeeQuestions = [
    {
        name: "empId",
        message: "Enter ID number for which you'd like to update? (digits only).",
        type: "number"
    },
    {
        name: "newRoleId",
        message: "Enter new role ID for employee? (digits only).",
        type: "number"
    }
]

function updateEmployeeRole(updateEmpInfo) {
    connection.query("UPDATE employeeTable SET role_ID=? WHERE id=?", [updateEmpInfo.newRoleId, updateEmpInfo.empId], function (err, result) {
        if (err) throw err;
        console.log("Employee role has been updated");
        employeeTracker();
    });
}; 