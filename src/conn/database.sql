CREATE DATABASE `contacts_namagement_db`;

USE `contacts_namagement_db`;

DROP TABLE IF EXISTS `contacts`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
	`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`username` VARCHAR(10) UNIQUE NOT NULL,
	`date` TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE `contacts` (
	`id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`name` VARCHAR(25) NOT NULL,
	`number` VARCHAR(15) UNIQUE NOT NULL,
	`owner` INT NOT NULL,
	`date` TIMESTAMP DEFAULT NOW() NOT NULL,

	CONSTRAINT fk_users_id FOREIGN KEY (owner) REFERENCES users (id)
);

/*
INSERT INTO contacts
	(name, number, owner)
VALUES
	('Stephanye Ruiz', '3107440769', 1),
	('Yuliana Ribón', '3126329011', 1),
	('Mónica Regalado', '3212049027', 1),
	('Michelle López', '3216559049', 1),
	('Maryuri Monsalve', '3157691081', 1),

	('Betty Romero', '3214454659', 2),
	('Cindy León', '3043591786', 2),
	('Diana Macea', '3108826414', 2),
	('Liliana Mejía', '3142864665', 2),
	('Valentina Machado', '3218119138', 2);
*/
