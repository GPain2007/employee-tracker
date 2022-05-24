USE employee_db

INSERT INTO department(
    id,
    name
) VALUES (
    10,
    "Property Management"
);

INSERT INTO role (
    id,
    title,
    salary,
    department_id
) VALUES (
    26,
    "Building Engineer",
    900000,
    4
);

INSERT INTO employee (
    id,
    first_name,
    last_name,
    role_id,
    manager_id
) VALUES (
    1,
    "GOVNOR",
    "PAYNE",
    5,
    3
    );


    INSERT INTO manager(
    id,
    name
) VALUES (
    2,
    "thomas baker"
);

    

