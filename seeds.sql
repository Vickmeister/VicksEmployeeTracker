DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employeeTable (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  role_id INT,
  manager_id INT
);

CREATE TABLE roleTable (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL,
  department_id INT
);

CREATE TABLE departmentTable (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

INSERT INTO departmentTable (name)
VALUES ("Front Office"), ("Coaching Staff"), ("Players");

INSERT INTO roleTable (title, salary, department_id)
VALUES ("General Manager", 2000000, 1), ("Head Coach", 3000000, 2), ("Team Captains", 23000000, 3);

INSERT INTO employeeTable (firstName, lastName, role_id, manager_id)
VALUES ("Ryan", "Pace", 1, 1), ("Matt", "Nagy", 2, 2), ("Khalil", "Mack", 3, 3);