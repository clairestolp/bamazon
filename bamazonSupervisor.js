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
    if(err) throw err;
    console.log('\nConnected as id ' + connection.threadId + '\n');
    supervisorMenu();
});

function supervisorMenu() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Main Menu \n',
            choices: ['View Product Sales by Department', 'Create New Department'],
            name: 'option'
        }
    ]).then(function (response) {

        switch (response.option) {
            case 'View Product Sales by Department':
                viewSalesByDepartment();
                break;
            case 'Create New Department':
                newDepartment();
                break;
        }

    });
}



function viewSalesByDepartment() {
    const queryStr = 'SELECT p.item_id, p.department_name, SUM(p.product_sales) AS total_sales, SUM(p.product_sales) - d.over_head_costs total_profit ' +
    'FROM products as p ' +
    'JOIN departments d ON d.department_name = p.department_name ' +
    'GROUP BY p.department_name';

    connection.query(queryStr, function (err, res) {
        if(err) throw err;
        let table = new Table({
            head: ['id', 'Department', 'Total Sales', 'Total Revenue'],
            colWidths: [5, 20, 20, 20]
        });

        res.forEach(function (val) {
            let arr = [
                val.item_id,
                val.department_name,
                val.total_sales,
                val.total_profit
            ];

            table.push(arr);
        });

        console.log(table.toString());
        connection.end();
    });

}

function newDepartment () {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter new department name',
            name: 'departmentName'
        },
        {
            type: 'input',
            message: 'Enter overhead costs',
            name: 'overhead'
        }
    ]).then(function (response) {
        const query = connection.query(
            'INSERT INTO departments SET ?',
            {
                department_name: response.departmentName,
                over_head_costs: response.overhead
            },
            function (err, res) {
                if(err) throw err;
                console.log('Department Added!');
            }
        );
        connection.end();
    });
}

