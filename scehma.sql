DROP DATABASE IF EXISTS trackerDB;
CREATE database trackerDB;

USE trackerDB;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL (10,4) NULL,
    department_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

SELECT 
department.name,
role.title,
role.salary,
role.department_id,
employee.first_name,
employee.last_name,
employee.role_id
FROM employee
INNER JOIN department ON department.id = employee.id
INNER JOIN role ON role.id = employee.id

