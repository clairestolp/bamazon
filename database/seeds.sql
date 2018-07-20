USE bamazon;
SELECT * FROM products;

USE bamazon;
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES 
('Mithral Armor', 'Armor', 5349.99, 10),
('Heavy Plate', 'Armor', 1000.00, 24),
('Potion of Flying', 'Potions', 25.56, 138),
('Mace of Disruption', 'Weapons', 999.99, 2),
('Moon-Touched Great Sword', 'Weapons', 2597, 6),
('Disguise Kit', 'Equiptment', 121.56, 11),
('Laser Pistol', 'Weapon', 9320.13, 1),
('Elixir of Health', 'Potion', 32.45, 3784),
('Philter of Love', 'Potion', 100000.00, 3),
('Blanket', 'Equiptment', 12, 289),
('Travelers Clothes', 'Equiptment', 209, 17.63);

USE bamazon; 
INSERT INTO departments(department_name, over_head_costs)
VALUES
('Armor', 1000),
('Potions', 5000),
('Weapons', 12000),
('Equiptment', 3000);
