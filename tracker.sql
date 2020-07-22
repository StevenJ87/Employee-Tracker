DROP DATABASE IF EXISTS employee_tracker_db;
CREATE database employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
  id INT auto_increment NOT NULL PRIMARY KEY,
  dep_name VARCHAR(30) NOT NULL
);

CREATE TABLE job_role (
  id INT auto_increment NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department INT,
  CONSTRAINT FK_department FOREIGN KEY (department)
  REFERENCES department(id),
  dep_name VARCHAR(30)
);

CREATE TABLE employee (
  id INT auto_increment NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  CONSTRAINT FK_drole FOREIGN KEY (id)
  REFERENCES job_role(id),
  department INT,
  CONSTRAINT FK_department2 FOREIGN KEY (department)
  REFERENCES department(id)
)

SELECT * FROM department;
SELECT * FROM job_role;
SELECT * FROM employee;