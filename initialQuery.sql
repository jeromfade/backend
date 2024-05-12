CREATE DATABASE cordova;

CREATE TYPE user_role_enum AS ENUM ('admin', 'user');

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    age INTEGER,
    designation VARCHAR(50),
    phone VARCHAR(15),
    employee_id VARCHAR(20) UNIQUE,
    email VARCHAR(100) UNIQUE,
    address VARCHAR(100),
    user_role user_role_enum,
    password VARCHAR(100)
);


CREATE TABLE "token" (
    id SERIAL PRIMARY KEY,
    api_key VARCHAR(255) UNIQUE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);

INSERT INTO "user" (name, age, designation, phone, employee_id, email, address, user_role, password)
VALUES ('admin', 0, 'ADMIN', '1234567891', CONCAT('EMP', (SELECT currval(pg_get_serial_sequence('user','id')))), 'admin@gmail.com', 'CORDOVA', 'admin', '$2b$10$fQe.1tJ1W3jO59Urrc8w5.AYnB1kQ3/GGzCafzjO4skgUBh3AXsr2');


INSERT INTO "user" (name, age, designation, phone, employee_id, email, address, user_role, password)
VALUES ('user', 0, 'USER', '988876554', CONCAT('EMP', (SELECT currval(pg_get_serial_sequence('user','id')))), 'user@gmail.com', 'CORDOVA', 'user', '$2b$10$QRnWGFh8yC7EIHRti3S9EOu1MOSYvu9VPZMdze4idGi4qpe1/0Rn2');
