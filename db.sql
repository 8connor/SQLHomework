CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE departments
(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(255),
    over_head_costs INT NOT NULL,
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("clothing", 2000000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("electronics", 50000);


CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (255),
    department_name VARCHAR
    (255),
    price INT NOT NULL,
    stock_quantity INT,
    PRIMARY KEY
    (item_id)
);



