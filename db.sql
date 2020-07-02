CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price INT NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

SELECT *
FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bike", "Outdoors", 150, 4);