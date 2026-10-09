---------------------------------------------------
CREATE DATABASE
---------------------------------------------------

CREATE DATABASE disaster_relief_db;

USE disaster_relief_db;

---------------------------------------------------
1. USERS TABLE
---------------------------------------------------

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    role VARCHAR(50),
    password VARCHAR(100)
);

---------------------------------------------------
2. DISASTERS TABLE
---------------------------------------------------

CREATE TABLE disasters (
    disaster_id INT PRIMARY KEY AUTO_INCREMENT,
    disaster_type VARCHAR(100),
    location VARCHAR(100),
    start_date DATE,
    end_date DATE,
    severity_level VARCHAR(50),
    status VARCHAR(50)
);

---------------------------------------------------
3. RELIEF CAMPS TABLE
---------------------------------------------------

CREATE TABLE relief_camps (
    camp_id INT PRIMARY KEY AUTO_INCREMENT,
    disaster_id INT,
    camp_name VARCHAR(100),
    location VARCHAR(100),
    capacity INT,
    current_occupancy INT,

    FOREIGN KEY (disaster_id)
    REFERENCES disasters(disaster_id)
);

---------------------------------------------------
4. VICTIMS TABLE
---------------------------------------------------

CREATE TABLE victims (
    victim_id INT PRIMARY KEY AUTO_INCREMENT,
    camp_id INT,
    victim_name VARCHAR(100),
    age INT,
    gender VARCHAR(20),
    health_status VARCHAR(50),
    arrival_date DATE,

    FOREIGN KEY (camp_id)
    REFERENCES relief_camps(camp_id)
);

---------------------------------------------------
5. RESOURCES TABLE
---------------------------------------------------

CREATE TABLE resources (
    resource_id INT PRIMARY KEY AUTO_INCREMENT,
    resource_name VARCHAR(100),
    quantity INT,
    supplier_name VARCHAR(100),
    received_date DATE,
    expiry_date DATE
);

---------------------------------------------------
6. DONATIONS TABLE
---------------------------------------------------

CREATE TABLE donations (
    donation_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    disaster_id INT,
    amount DECIMAL(10,2),
    donation_date DATE,
    payment_method VARCHAR(50),

    FOREIGN KEY (user_id)
    REFERENCES users(user_id),

    FOREIGN KEY (disaster_id)
    REFERENCES disasters(disaster_id)
);

---------------------------------------------------
INSERT COMMANDS
---------------------------------------------------

INSERT INTO users
(name,email,phone,role,password)
VALUES
('Rahul','rahul@gmail.com','9876543210','Volunteer','rahul123'),
('Anu','anu@gmail.com','9876543211','Admin','anu123'),
('Ravi','ravi@gmail.com','9876543212','Donor','ravi123'),
('Meena','meena@gmail.com','9876543213','Volunteer','meena123'),
('Kiran','kiran@gmail.com','9876543214','Donor','kiran123');

---------------------------------------------------

INSERT INTO disasters
(disaster_type,location,start_date,end_date,severity_level,status)
VALUES
('Flood','Kerala','2026-05-01','2026-05-10','High','Active'),
('Earthquake','Delhi','2026-04-01','2026-04-03','Medium','Resolved'),
('Cyclone','Chennai','2026-03-11','2026-03-18','High','Active'),
('Fire','Bangalore','2026-02-01','2026-02-02','Low','Resolved'),
('Landslide','Munnar','2026-01-20','2026-01-25','Medium','Active');

---------------------------------------------------

INSERT INTO relief_camps
(disaster_id,camp_name,location,capacity,current_occupancy)
VALUES
(1,'Kerala Flood Camp','Alappuzha',500,350),
(2,'Delhi Earthquake Camp','New Delhi',300,200),
(3,'Chennai Cyclone Camp','Chennai',450,300),
(4,'Bangalore Fire Camp','Whitefield',150,80),
(5,'Munnar Landslide Camp','Munnar',250,120);

---------------------------------------------------

INSERT INTO victims
(camp_id,victim_name,age,gender,health_status,arrival_date)
VALUES
(1,'Arjun',25,'Male','Stable','2026-05-02'),
(1,'Sneha',30,'Female','Injured','2026-05-03'),
(2,'Rohit',40,'Male','Critical','2026-04-01'),
(3,'Priya',28,'Female','Stable','2026-03-12'),
(5,'Akhil',35,'Male','Recovering','2026-01-21');

---------------------------------------------------

INSERT INTO resources
(resource_name,quantity,supplier_name,received_date,expiry_date)
VALUES
('Food Packets',1000,'Red Cross','2026-05-01','2026-06-01'),
('Water Bottles',2000,'NGO Supply','2026-05-01','2026-06-15'),
('Medicines',500,'Apollo','2026-05-02','2027-01-01'),
('Blankets',300,'Relief Trust','2026-04-15','2027-04-15'),
('Tents',100,'Shelter Org','2026-03-20','2028-03-20');

---------------------------------------------------

INSERT INTO donations
(user_id,disaster_id,amount,donation_date,payment_method)
VALUES
(3,1,5000,'2026-05-02','UPI'),
(5,3,7000,'2026-03-15','Card'),
(3,5,3000,'2026-01-23','Net Banking'),
(5,1,10000,'2026-05-04','UPI'),
(3,2,2500,'2026-04-02','Cash');

---------------------------------------------------
SELECT COMMANDS
---------------------------------------------------

SELECT * FROM users;

SELECT * FROM disasters;

SELECT * FROM relief_camps;

SELECT * FROM victims;

SELECT * FROM resources;

SELECT * FROM donations;

---------------------------------------------------
UPDATE COMMAND
---------------------------------------------------

UPDATE victims
SET health_status = 'Recovered'
WHERE victim_id = 2;

---------------------------------------------------
DELETE COMMAND
---------------------------------------------------

DELETE FROM donations
WHERE donation_id = 4;

---------------------------------------------------
ALTER COMMAND
---------------------------------------------------

ALTER TABLE users
ADD address VARCHAR(200);

---------------------------------------------------
VIEW COMMAND
---------------------------------------------------

CREATE VIEW active_camps AS

SELECT
    camp_name,
    location,
    current_occupancy
FROM relief_camps
WHERE current_occupancy > 0;

---------------------------------------------------
DISPLAY VIEW
---------------------------------------------------

SELECT * FROM active_camps;

---------------------------------------------------
TRIGGER COMMAND
---------------------------------------------------

DELIMITER $$

CREATE TRIGGER update_resource_quantity

AFTER INSERT ON donations

FOR EACH ROW

BEGIN

    UPDATE resources
    SET quantity = quantity - 10
    WHERE resource_id = 1;

END $$

DELIMITER ;

---------------------------------------------------
TEST TRIGGER
---------------------------------------------------

INSERT INTO donations
(user_id,disaster_id,amount,donation_date,payment_method)
VALUES
(1,1,2000,'2026-05-06','UPI');

---------------------------------------------------
JOIN QUERY
---------------------------------------------------

SELECT
    victims.victim_name,
    relief_camps.camp_name,
    disasters.disaster_type

FROM victims

JOIN relief_camps
ON victims.camp_id = relief_camps.camp_id

JOIN disasters
ON relief_camps.disaster_id = disasters.disaster_id;

---------------------------------------------------
GROUP BY QUERY
---------------------------------------------------

SELECT
    disaster_type,
    COUNT(*) AS total_disasters

FROM disasters

GROUP BY disaster_type;

---------------------------------------------------
ORDER BY QUERY
---------------------------------------------------

SELECT *
FROM donations
ORDER BY amount DESC;

---------------------------------------------------
SUBQUERY
---------------------------------------------------

SELECT victim_name
FROM victims

WHERE camp_id IN (

    SELECT camp_id
    FROM relief_camps
    WHERE capacity > 200

);

---------------------------------------------------
DROP VIEW
---------------------------------------------------

DROP VIEW active_camps;

---------------------------------------------------
DROP TRIGGER
---------------------------------------------------

DROP TRIGGER update_resource_quantity;

---------------------------------------------------
END OF PROJECT
---------------------------------------------------