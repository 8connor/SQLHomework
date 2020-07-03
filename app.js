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

    reset();
});

function purchase() {
    var purchase = true;

    readDb();

    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What item would you like to purchase? (enter the item id)"
        },
        {
            name: "quantity",
            type: "input",
            message: "how many of the item would you like to purchase? (enter a number)"
        },
    ]).then(function (answer) {
        input1 = answer.item
        input2 = answer.quantity

        var upInv = "UPDATE products SET stock_quantity = (stock_quantity - " + input2 + ") WHERE item_id = "
            + '"' + input1 + '"';

        if (input1 === "" || input2 === "") {
            console.log("input is required")
            reset()
        } else {
            connection.query(upInv, function (err, res) {
                if (err) throw err;



                console.log("product purchased successfully")
                reset();
            });
        };



    });
};

function readDb() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("item id: " + res[i].item_id);
            console.log("Product: " + res[i].product_name);
            console.log("Stock: " + res[i].stock_quantity);
            console.log("Price: " + res[i].price);
            console.log("--------------------------------");
        };

        if (purchase = true) {
            return;
        } else {
            reset();
        };

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
        reset();
    });
};

function addProd() {

    inquirer.prompt([
        {
            name: "add",
            type: "input",
            message: "command layout: (product name)"
        },
        {
            name: "department",
            type: "input",
            message: "command layout: (department)"
        },
        {
            name: "price",
            type: "input",
            message: "command layout: (price)"
        },
        {
            name: "stock",
            type: "input",
            message: "command layout: (how many items in stock)"
        },
    ]).then(function (answer) {
        input1 = answer.add
        input2 = answer.department
        input3 = answer.price
        input4 = answer.stock

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

            reset();
            console.log("successfully added!")
        });
    })

};

function addInv() {
    inquirer.prompt([
        {
            name: "add",
            type: "input",
            message: "command layout: (product)"
        },
        {
            name: "number",
            type: "input",
            message: "command layout: (Quantity)"
        },
    ]
    )
        .then(function (answer) {
            input1 = answer.add
            input2 = answer.number
            var upInv = "UPDATE products SET stock_quantity = " + input2 + " WHERE product_name = "
                + '"' + input1 + '"';
            connection.query(upInv, answer.add, function (err, res) {
                if (err) throw err;

                reset();

                console.log("PRODUCT INVENTORY UPDATED!");
            });

        }
    );
};

function reset() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "rawlist",
                message: "Please select",
                choices: [
                    "products",
                    "purchase",
                    "low-inventory",
                    "add",
                    "addInventory",
                    "help",
                    "close"
                ]
            },
        ])
        .then(function (answer) {
            switch (answer.action) {
                case "products":
                    readDb();
                    break;
                case "purchase":
                    purchase();
                    break;

                case "low-inventory":
                    lowInv();
                    break;

                case "add":
                    addProd();
                    break;

                case "addInventory":
                    addInv();
                    break;
                case "close":
                    connection.end()
                    break;
                case "help":
                    console.log("under construction")
                    break;
            }
        }
    );
};

