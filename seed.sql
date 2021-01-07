INSERT INTO department (name)
VALUES ("Marketing"), ("Engineers"), ("Manager"), ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("marketer", 60000.00, 1), ("engineer", 90000.00, 2), ("manager", 100000.00, 3), ("customer service", 45000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, NULL), ("Tom", "Hanks", 2, NULL), ("Chris", "Bell", 4, NULL);