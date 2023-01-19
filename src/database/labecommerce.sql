-- Active: 1674139856019@@127.0.0.1@3306
CREATE TABLE users(
id TEXT PRIMARY KEY UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL

);

PRAGMA table_info('users');

INSERT INTO users(id, email, password)
VALUES 
('u001', 'astrodev@gmail.com', 'password123'),
('u002', 'fulano@gmail.com', 'pass123'),
('u003', 'ciclano@gmail.com', 'pass1234');




 
-- Get All Users
SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products(id, name, price, category)
VALUES
('p001', 'blusa', 10, 'roupa'),
('p002', 'vestido', 23, 'roupa'),
('p003', 'chinelo', 13, 'calçados'),
('p004', 'colar', 12, 'acessórios'),
('p005', 'pulseira', 16, 'acessórios');

DROP TABLE products;

-- Get All Products
SELECT * FROM products;


-- Search Product by name
SELECT * FROM products 
WHERE name = 'vestido';


-- Create User
INSERT INTO users(id,email,password)
VALUES('p007', 'user7@gmail.com', 'p123456');


-- Create Product
INSERT INTO products(id, name, price, category)
VALUES('p005', 'calça', 14.55, 'roupas');


-- Get Products by id
SELECT * FROM products
WHERE id='p0001';

-- Delete User by id
DELETE FROM users 
WHERE id= 'u001';

-- Delete Product by id

DELETE FROM products
WHERE id='p0001';

-- Edit User by id
UPDATE users
SET password='password2356'
WHERE id='u002';

-- Edit Product by id
UPDATE products
SET name='anel'
WHERE id='p0004';

-- Get All Users em order crescente
SELECT * FROM users
ORDER BY email ASC;

-- Get All Products versão 1
SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 0;

-- Get All Products versão 2
SELECT * FROM products
WHERE price <= 13 OR price<=16;

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases;

-- get All purchases

SELECT * FROM purchases;

INSERT INTO purchases(id,total_price,paid,buyer_id)
VALUES
('pu001',20, 0,'u001'),
('pu002',30, 0,'u001'),
('pu003',60, 0,'u002'),
('pu004',30, 0,'u002'),
('pu005',10, 0,'u003'),
('pu006',11, 0,'u003');

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = 'pu001';

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = 'pu002';

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = 'pu003';

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = 'pu004';

--getPurchaseByUserId
SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;
-- WHERE buyer_id ='u001';


CREATE TABLE purchases_products(
 purchase_id TEXT NOT NULL,
 product_id TEXT NOT NULL,
 quantity INTEGER NOT NULL,
 FOREIGN KEY (purchase_id) REFERENCES purchases(id),
 FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES 
('pu001', 'p003', 3),
('pu002', 'p001', 1),
('pu005', 'p005', 3);


DROP TABLE purchases_products;

SELECT * FROM purchases_products;

SELECT 
products.name,
purchases_products.product_id AS productId,
purchases_products.purchase_id AS purchaseId,
purchases_products.quantity AS quantity
FROM purchases_products
INNER JOIN products
ON purchases_products.product_id = products.id
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id;
