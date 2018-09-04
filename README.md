# bamazon
A mock CLI amazon storefront with a customer interface, a manager interface, and a supervisor interface

## Demos

#### bamazonCustomer.js

<img width="50%" src="https://github.com/clairestolp/bamazon/blob/master/demo/demo-customer.gif?raw=true">

#### bamazonManager.js

<img width="50%" src="https://github.com/clairestolp/bamazon/blob/master/demo/demo-manager.gif?raw=true">

#### bamazonSupervisor.js

<img width="50%" src="https://github.com/clairestolp/bamazon/blob/master/demo/demo-supervisor.gif?raw=true">


## Technologies Used
* JavaScript
* NodeJS
* MySql
* cli-table
* inquirer

## Goals
This small web app was created to fulfill the requirements of the UNC Chapel Hill Coding Bootcamp and demonstrates an understanding of MySql. The Customer View reads data from the database and updates entries. The Manager View demonstrates creating and inserting new data, updating the table, and manipulating data to show it dynamically.  The Supervisor View utilizes joins to grab data from two different tables, manipulate the data, and create a new table based on it. Another target of this assignment was to create a CLI application that utilizes tables to show data in the command line.

### Customer View

Displays all of the items available for sale including their ids, names, and prices.

Prompts the user to select an item to buy as well as the quantity

Once the user has placed an order the app displays a summary including the item, price, quantitiy and total price

### Manager View 

Displays a set of menu options
  * `View Products for Sale`
  * `View Low Inventory`
  * `Add to Inventory`
  * `Add New Product`
  
 `View Products for Sale` Lists every item available including Ids, names, prices, and quantities.

 `View Low Inventory` lists all inventory with a count lower than five.

 `Add to Inventory` Prompts the user to select an item and update the quantity.

 `Add New Product` Prompts the user to add a new product, price, and quantity.

 
### Supervisor View 

Displays a set of menu options
  * View Product Sales by Department
  * Create a New Department
  
  `View Product Sales by Department` calculates the total overhead cost for each department, product sales, and the delta of the two to get the total profit
  
  `Create a New Department` prompts the user to enter a department name and the overhead costs then creates a new department in the database.
  
  
### known Issues: 

When a user creates a new department and selects `View Sales by Department` The new department is not displayed on the list because no new products have been added in the system so the program cannot calculate the total overhead, total sales, or total revenue values. Once a product has been added via the manager view, the new department will be displayed when `View Sales by Department` is selected.

