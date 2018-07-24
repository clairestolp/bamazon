DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price  DECIMAL(15, 2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY(item_id)
);

USE bamazon;
SELECT * FROM products;

USE bamazon; 

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR (100) NOT NULL,
    over_head_costs DECIMAL (20, 2) NOT NULL,
    PRIMARY KEY (department_id)
);

USE bamazon;
SELECT * FROM departments;

USE bamazon;
ALTER TABLE products 
ADD COLUMN product_sales DECIMAL(20, 2) NOT NULL DEFAULT 0;

USE bamazon;
SELECT p.department_name, SUM(p.product_sales) AS total_sales, SUM(p.product_sales) - d.over_head_costs total_profit
FROM products as p
JOIN departments d ON d.department_name = p.department_name
GROUP BY p.department_name;















