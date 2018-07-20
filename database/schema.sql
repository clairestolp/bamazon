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
ALTER TABLE products
DROP COLUMN product_sales;

USE bamazon;
SELECT department_name, SUM(product_sales) 
AS total_sales 
FROM products 
GROUP BY department_name;

SELECT * FROM departments;

USE bamazon;
SELECT (product_sales) AS total_sales, SUM(product_sales) - d.over_head_costs AS total_profit
FROM products AS p, departments AS d
LEFT JOIN departments ON d.department_name = p.department_name
GROUP BY d.department_name;





