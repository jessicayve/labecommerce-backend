-- Active: 1673880080646@@127.0.0.1@3306

CREATE TABLE users(
id TEXT PRIMARY KEY UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL

);

PRAGMA table_info('users');

INSERT INTO users(id, email, password)
VALUES 
('u001', 'astrodev@gmail.com', 'password123');

INSERT INTO users(id, email, password)
VALUES ('u002', 'fulano@gmail.com', 'pass123');

INSERT INTO users(id,email,password)
VALUES('u003', 'ciclano@gmail.com', 'pass1234');
 

SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products(id, name, price, category)
VALUES('p0001', 'blusa', 10.90, 'roupa');

INSERT INTO products(id, name, price, category)
VALUES('p0002', 'vestido', 23.90, 'roupa');

INSERT INTO products(id, name, price, category)
VALUES('p0003', 'chinelo', 13.90, 'calçados');

INSERT INTO products(id, name, price, category)
VALUES('p0004', 'colar', 12.90, 'acessórios');

INSERT INTO products(id, name, price, category)
VALUES('p0005', 'pulseira', 16.90, 'acessórios');

SELECT * FROM products;