-- Active: 1674139856019@@127.0.0.1@3306
CREATE TABLE users(
id TEXT PRIMARY KEY UNIQUE NOT NULL,
name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL,
created_at TEXT DEFAULT (DATETIME()) NOT NULL

);
DROP TABLE users;

PRAGMA table_info('users');

INSERT INTO users(id,name, email, password)
VALUES 
('u001', 'Astrodev', 'astrodev@gmail.com', 'password123'),
('u002', 'Fulano',  'fulano@gmail.com', 'pass123'),
('u003', 'Ciclano', 'ciclano@gmail.com', 'pass1234');
 
-- Get All Users
SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products(id, name, price, description, image_url)
VALUES
('p001', 'blusa', 10, 'blusa rosa com laço vermelho', 'https://picsum.photos/200'),
('p002', 'vestido', 23, 'vestido azul com renda branca', 'https://picsum.photos/200'),
('p003', 'chinelo', 13, 'chinelo amarelo com detalhes brancos', 'https://picsum.photos/200'),
('p004', 'colar', 12, 'colar de ouro com pingente', 'https://picsum.photos/200'),
('p005', 'pulseira', 16, 'pulserira de prata e brilhantes', 'https://picsum.photos/200');

DROP TABLE products;

-- Get All Products
SELECT * FROM products;


-- Search Product by name
SELECT * FROM products 
WHERE name = 'vestido';



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

-- Get All Users em ordem crescente
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
    created_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases;

-- get All purchases

SELECT * FROM purchases;

INSERT INTO purchases(id,total_price,paid,buyer_id)
VALUES
('pu001',150, 0,'u001'),
('pu002',200, 0,'u001'),
('pu003',250, 0,'u002'),
('pu004',300, 0,'u002'),
('pu005',500, 0,'u003'),
('pu006',360, 0,'u003');

UPDATE purchases
SET created_at = DATETIME('now')
WHERE id = 'pu001';

UPDATE purchases
SET created_at = DATETIME('now')
WHERE id = 'pu002';

UPDATE purchases
SET created_at = DATETIME('now')
WHERE id = 'pu003';

UPDATE purchases
SET created_at = DATETIME('now')
WHERE id = 'pu004';

UPDATE purchases
SET created_at = DATETIME('now')
WHERE id = 'pu005';

UPDATE purchases
SET created_at = DATETIME('now')
WHERE id = 'pu006';

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
('cp001', 'p003', 3),
('cp002', 'p001', 1),
('cp005', 'p005', 3);


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

SELECT
products.name,
purchases_products.product_id AS productId,
purchases_products.purchase_id AS purchaseId,
purchases_products.quantity AS quantity
FROM purchases_products
RIGHT JOIN products
ON purchases_products.product_id = products.id
LEFT JOIN purchases
ON purchases_products.purchase_id = purchases.id;