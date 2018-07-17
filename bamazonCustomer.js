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
    console.log('Welcome to Bamazon! Your one stop adventure shop!\n');
    viewProducts();
});

function viewProducts () {
    const query = connection.query('SELECT * FROM products', function (err, res){
        if (err) throw (err);
        const productsTable = new Table({
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
            productsTable.push(arr);
        });
        
        console.log(productsTable.toString());
        orderProduct();
    });
}

function orderProduct() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Type in a product id to order',
            name: 'orderId'
        },
        {
            type: 'input', 
            message: 'How many would you like?',
            name: 'orderQuantity'
        }
    ]).then(function (response) {
        const query = connection.query(
            'SELECT * FROM products WHERE ?',
            {
                item_id: response.orderId
            },
            function (err, res) {
            if (err) throw err;
            //console.log(res);
            const product = res[0];
            
            if(response.orderQuantity <= product.stock_quantity){
                console.log(
                    '\nINVOICE\n' +
                    '\n\nProduct ID: ' + product.item_id + '\n' +
                    'Product Name: ' + product.product_name + '\n' +
                    'Department: ' + product.department_name + '\n' +
                    'Price: ' + product.price + '\n' + 
                    'Quantity: ' + response.orderQuantity + '\n\n' +
                    'Total: $' + product.price * response.orderQuantity
                );
                updateStock(product.item_id, product.stock_quantity, response.orderQuantity);
            }else{
                console.log('\n\nInvalid Quantity!\nTry again\n\n');
                return viewProducts();
            }
            
        connection.end();
        });
    });
}

function updateStock(id, stock, quantity) {
    const query = connection.query(
        'UPDATE products SET ? WHERE ?',
        [
            {
                stock_quantity: stock - quantity
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
            if (err) throw err;
            //console.log('Inventory Updated');
        }
    );
}