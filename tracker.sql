DROP DATABASE IF EXISTS employee_tracker_db;
CREATE database employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY,
  dep_name VARCHAR(30) NOT NULL
);

CREATE TABLE job_role (
  id INT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department INT,
  CONSTRAINT FK_department FOREIGN KEY (department)
  REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  CONSTRAINT FK_drole FOREIGN KEY (id)
  REFERENCES job_role(id),
  department INT,
  CONSTRAINT FK_department FOREIGN KEY (department)
  REFERENCES department(id)
)

SELECT * FROM department;
SELECT * FROM job_role;
SELECT * FROM employee;

INSERT INTO department (id,dep_name)
VALUES (1,"Management");

INSERT INTO job_role (id,title,salary,department)
VALUES (1,"CEO",300,1);

INSERT INTO job_role (id,title,salary,department)
VALUES (2,"CFO",285,1);