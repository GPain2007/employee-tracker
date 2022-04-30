


CREATE TABLE department(
id: INT PRIMARY KEY
name: VARCHAR(30) )


CREATE TABLE role (
id: INT PRIMARY KEY
title: VARCHAR(30) to hold role title
salary: DECIMAL to hold role salary
department_id: INT )


CREATE TABLE employee (
id: INT PRIMARY KEY
first_name: VARCHAR(30) to hold employee first name
last_name: VARCHAR(30) to hold employee last name
role_id: INT to hold reference to employee role
manager_id: INT )