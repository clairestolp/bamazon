const mysql = require('mysql');
const Table = require('cli-table');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'E9$i10n25$',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    manageProducts();
});

function manageProducts() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Main Menu',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
            name: 'option'
        }
    ]).then(function (response) {
        switch(response.option) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add to Inventory':
                addInventory();
                break;
            case 'Add New Product':
                addProduct();
                break;
        }
    });
}

function viewProducts () {
    const query = connection.query('SELECT * FROM products', function (err, res){
        if (err) throw (err);
        const productsTable = new Table({
            head: ['id', 'Product Name', 'Department', 'Price', 'Stock', 'Sales'],
            colWidths: [5, 20, 15, 15, 10, 10]
        });
        
        res.forEach(function (val) {
            let arr = [
                val.item_id,
                val.product_name,
                val.department_name,
                '$' + val.price,
                val.stock_quantity,
                val.product_sales
            ]
            productsTable.push(arr);
        });
        
        console.log(productsTable.toString());
    });
    connection.end();
}

function lowInventory () {
    const query = connection.query(
        'SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 5',
        function (err, res) {
            if (err) throw err;
            const lowStock = new Table({
                head: ['id', 'Product Name', 'Department', 'Price', 'Stock'],
                colWidths: [5, 20, 15, 15, 10]
            });
            
            res.forEach(function (val) {
                let arr = [
                    val.item_id,
                    val.product_name,
                    val.department_name,
                    '$' + val.price,
                    val.stock_quantity
                ]
                lowStock.push(arr);
            });
            console.log(lowStock.toString());
        });
        connection.end();
}

function addInventory () {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the item id of the product you would like to update.',
            name: 'id'
        },
        {
            type: 'input',
            message: 'Enter the number of items to add.',
            name: 'quantity'
        }
    ]).then(function (response){
        const queryStr = 'UPDATE products SET stock_quantity = stock_quantity + ' + response.quantity + ' WHERE ?' 
        const query = connection.query(
            queryStr,
            [  
                {
                    item_id: response.id
                }
            ],
            function (err, res) {
                console.log('\nUpdated!\n');
            });
        connection.end();
    });
}

function addProduct() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter product name...',
            name: 'itemName'
        },
        {
            type: 'input',
            message: 'Enter department name...',
            name: 'departmentName'
        },
        {
            type: 'input',
            message: 'Enter item price...',
            name: 'itemPrice'
        },
        {
            type: 'input',
            message: 'Enter stock quantity...',
            name: 'quantity'
        }
    ]).then(function (response) {
        const query = connection.query(
            'INSERT INTO products SET ?',
            {
                product_name: response.itemName,
                department_name: response.departmentName,
                price: response.itemPrice,
                stock_quantity: response.quantity
            },
            function (err, res) {
                if (err) throw err;
                console.log('Success! Products updated!');
            });
            connection.end();
    });
}