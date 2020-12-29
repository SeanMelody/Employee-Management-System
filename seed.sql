DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 150000, 1), ("Accountant", 100000, 2), ("Database Admin", 150000, 1), ("Traveling Salesman", 10000, 4);

SELECT * FROM role;
SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Matt", "Melody", 1), ("Ashely", "Cookerly", 2), ("Arya", "Cookerly", 3), ("Ted", "Mosby", 4);