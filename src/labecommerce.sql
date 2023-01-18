-- Active: 1674064914573@@127.0.0.1@3306
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
('p0001', 'blusa', 10, 'roupa'),
('p0002', 'vestido', 23, 'roupa'),
('p0003', 'chinelo', 13, 'calçados'),
('p0004', 'colar', 12, 'acessórios'),
('p0005', 'pulseira', 16, 'acessórios');


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
