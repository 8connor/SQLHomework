var mysql = require("mysql");
var inquirer = require("inquirer");
const Choice = require("inquirer/lib/objects/choice");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    console.log("connected as id" + connection.threadId + "\n");

});



function products() {


    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;

        console.log("| department_id | department_name | over_head_costs | product_sales | total_profit |")
        console.log("| ------------- | --------------- | --------------- | ------------- | ------------ |")
        for (var i = 0; i < res.length; i++) {
            
            for(var length = res[i].department_name.length; length < 16; length++){
                res[i].department_name = res[i].department_name + " "
            }

            console.log("| " + res[i].department_id + "             | " + res[i].department_name + "|")

            
           


        }

    })
    connection.end()
}


products()

// inquirer.prompt([
//     {
//         name: "list",
//         type: "list",
//         choices: [
//             "View product sales by department",
//             "Create new department"
//         ]
//     }
// ]).then(function (answer) {

//     switch (answer.list) {
//         case "View product sales by department":
//             products();
//             break;

//     }
// })
