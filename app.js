var mysql = require("mysql");

var userCommand = process.argv[2];
var input1 = process.argv[3]
var input2 = process.argv[4]
var input3 = process.argv[5]
var input4 = process.argv[6]

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

function readDb() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("Product: " + res[i].product_name)
            console.log(res[i].stock_quantity)
            console.log("--------------------------------")
        };

        connection.end();
    });
};

function lowInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {

            if (res[i].stock_quantity < 100) {
                console.log("LOW STOCK")
                console.log("Product: " + res[i].product_name)
                console.log(res[i].stock_quantity)
                console.log("--------------------------------")
            }
        };
        connection.end();
    });
};

function addProd() {
    const insert = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("
        + '"'
        + input1
        + '"' + ", " + '"'
        + input2
        + '"' + ", " + '"'
        + input3
        + '"' + ", " + '"'
        + input4
        + '"' + ");"

    connection.query(insert, function (err, res) {
        if (err) throw err && console.log("Failed to add!");

        console.log("successfully added!")
    });
    connection.end();
};

function addInv() {
    var upInv = "UPDATE products SET stock_quantity = " + input2 + " WHERE product_name = "
        + '"' + input1 + '"';

    connection.query(upInv, function (err, res) {
        if (err) throw err;

        readDb()

        console.log("PRODUCT INVENTORY UPDATED!")
    });
};

if (userCommand === "products") {
    readDb();
} else if (userCommand === "low-inventory") {
    lowInv();
} else if (userCommand === "add") {
    addProd();
} else if (userCommand === "addInventory") {
    addInv()
} else if (userCommand === "help") {
    console.log("under construction")
}else{
    console.log("INPUT A COMMAND")
    connection.end();
}
