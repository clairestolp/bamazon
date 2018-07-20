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

/** QUERY 
 * Table displayed: 
 * departemnt_id
 * department_name
 * over_head_costs
 * product_sales
 * total_profit (calculated on the fly)
 * 
 * research: 
 * custom alias MYSQL
 * GROUP BY
 * JOINS
 */


function viewSalesByDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter a department',
            name: 'department'
        }
    ]).then(function (response) {
        const query = connection.query(
            'SELECT * FROM departments'
        )
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

