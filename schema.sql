CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price  DECIMAL(15, 2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY(item_id)
);

USE bamazon;
SELECT * FROM products;

