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
  job_role INT,
  CONSTRAINT FK_job_role FOREIGN KEY (job_role)
  REFERENCES job_role(id),
  title VARCHAR(30)
)

SELECT * FROM department;
SELECT * FROM job_role;
SELECT * FROM employee;