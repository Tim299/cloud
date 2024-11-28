DROP TABLE IF EXISTS "OrderItem" CASCADE;
DROP TABLE IF EXISTS "Order" CASCADE;
DROP TABLE IF EXISTS "Cart" CASCADE;
DROP TABLE IF EXISTS "Product" CASCADE;

CREATE TABLE "Product" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Cart" (
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    "productId" INT NOT NULL,
    "userId"INT NOT NULL,
    CONSTRAINT fk_product FOREIGN KEY ("productId") REFERENCES "Product" (id) ON DELETE CASCADE,
    CONSTRAINT uq_user_product UNIQUE ("userId", "productId")
);

CREATE TABLE "Order" (
    id SERIAL PRIMARY KEY,
    "userId" INT NOT NULL,
    total FLOAT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "OrderItem" (
    id SERIAL PRIMARY KEY,
    "orderId" INT NOT NULL,
    "productId" INT NOT NULL,
    quantity INT NOT NULL,
    price FLOAT NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY ("orderId") REFERENCES "Order" (id) ON DELETE CASCADE,
    CONSTRAINT fk_product_order FOREIGN KEY ("productId") REFERENCES "Product" (id) ON DELETE CASCADE
);

INSERT INTO "Product" (name, description, price) VALUES
('Product 1', 'Description of Product 1', 10.0),
('Product 2', 'Description of Product 2', 20.0),
('Product 3', 'Description of Product 3', 30.0);
